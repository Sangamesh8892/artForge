import userModel from "../models/usermodel.js";
import fetch from "node-fetch";
import { Buffer } from "buffer";

export const generateImage = async (req, res) => {
  const HF_API_URL = process.env.HF_API_URL;
  const HF_API_KEY = process.env.HF_API_KEY;

  try {
    const { userId, prompt } = req.body;

    if (!userId || !prompt) {
      return res.status(400).json({ success: false, message: "Missing details" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.creditBalance === 0) {
      return res.status(403).json({
        success: false,
        message: "Insufficient credits",
        credits: user.creditBalance,
      });
    }

    // Hugging Face request
    const hfResponse = await fetch(HF_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sync_mode: true,
        prompt: prompt,
      }),
    });

    if (!hfResponse.ok) {
      const errorText = await hfResponse.text();
      return res.status(500).json({ success: false, message: "HF API error", details: errorText });
    }

    // First try to parse as JSON
    let resultImage;
    try {
      const jsonResponse = await hfResponse.json();
      // Extract image URL from the JSON response
      // This extraction logic depends on the actual structure returned by the API
      if (jsonResponse.images && jsonResponse.images[0] && jsonResponse.images[0].url) {
        resultImage = jsonResponse.images[0].url;
      } else if (jsonResponse.image) {
        resultImage = jsonResponse.image;
      } else {
        throw new Error("Image data not found in API response");
      }
    } catch (jsonError) {
      // If not JSON, try to get as blob
      const blob = await hfResponse.blob();
      const arrayBuffer = await blob.arrayBuffer();
      resultImage = `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`;
    }

    // Deduct credit and save
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
    return res.status(500).json({ success: false, message: error.message });
  }
};
