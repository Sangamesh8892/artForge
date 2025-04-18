import userModel from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerUser= async (req,res)=>{
    try{
        const {name,email,password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({success:false,message:'Please fill all fields'})
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password,salt);

        const userData={
            name,
            email,
            password:hashedPassword
        }
        const newUser = new userModel(userData);
        const user = await newUser.save();

        const token=jwt.sign({id:user._id}, process.env.JWT_SECRET)
        res.json({
            success:true,
            token,
            user:{
                name:user.name
            }
        })

    }catch(error){
        return res.status(500).json({success:false, message:error.message})
    }
}

const loginUser= async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:'User not found'})      
        }
        const isMatch= await bcrypt.compare(password,user.password)

        if(isMatch){    
            const token=jwt.sign({id:user._id}, process.env.JWT_SECRET)
            res.json({
                success:true,
                token,
                user:{
                    name:user.name
                }
            })
        }else{
                return res.json({success:false,message:'Invalid credentials'})
        }
    }catch(error){
        console.log(error.message)
        return res.status(500).json({success:false, message:error.message})
    }
}

const userCredit= async(req,res)=>{
    try{
        const {userId}=req.body;
        const user=await userModel.findById(userId);
        res.json({
            success:true,
            credits:user.creditBalance,
            user:{
                name:user.name
            }

        })
    }catch(error){
        console.log(error.message)  
        return res.json({success:false, message:error.message})
    }
}





export {registerUser,loginUser,userCredit}