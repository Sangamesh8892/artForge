import userModel from "../models/usermodel.js";
import fetch from "node-fetch";
import FormData from "form-data";

export const generateImage = async (req, res) => {
  // ClipDrop API endpoint
  const CLIPDROP_API_URL = "https://clipdrop-api.co/text-to-image/v1";
  const CLIPDROP_API_KEY = process.env.CLIPDROP_API_KEY;

  try {
    const { userId, prompt } = req.body;

    if (!userId || !prompt) {
      return res.status(400).json({ success: false, message: "Missing details" });
    }

    // Verify prompt length (ClipDrop has a 1000 character limit)
    if (prompt.length > 1000) {
      return res.status(400).json({ 
        success: false, 
        message: "Prompt too long. Maximum allowed is 1000 characters." 
      });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.creditBalance === 0) {
      return res.status(403).json({
        success: false,
        message: "Insufficient credits",
        creditBalance: user.creditBalance,
      });
    }
    
    // Create form data to send to ClipDrop API
    const formData = new FormData();
    formData.append('prompt', prompt);

    // Make the API request
    const clipDropResponse = await fetch(CLIPDROP_API_URL, {
      method: "POST",
      headers: {
        "x-api-key": CLIPDROP_API_KEY,
        // No Content-Type header because form-data sets its own boundary
      },
      body: formData
    });

    // Check response status
    if (!clipDropResponse.ok) {
      const errorText = await clipDropResponse.text();
      console.error("ClipDrop API Error:", errorText);
      return res.status(clipDropResponse.status).json({ 
        success: false, 
        message: "ClipDrop API error", 
        details: errorText 
      });
    }

    // Get the image buffer
    const imageBuffer = await clipDropResponse.buffer();

    // Convert the image buffer to base64 
    const base64Image = imageBuffer.toString('base64');
    const resultImage = `data:image/png;base64,${base64Image}`;

    // Deduct credit from user balance
    user.creditBalance -= 1;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Image generated successfully",
      creditBalance: user.creditBalance,
      resultImage
    });
  } catch (error) {
    console.error("Image generation failed:", error);
    return res.status(500).json({ 
      success: false, 
      message: error.message || "Failed to generate image" 
    });
  }
};
