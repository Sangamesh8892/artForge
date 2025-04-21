import userModel from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import razorpay from "razorpay";
import transactionModel from "../models/transactionModel.js";

// ************** NOTE *****************
//I am getting a wierd error where the dotenv is not working properly in controller js file Only.
// Even though its configured in server.js and working fine there. I am not sure why its not working here.
// Anyways I am using this workaround to import dotenv in this file and use it.
// ************** NOTE *****************

import dotenv from 'dotenv';
dotenv.config({path :'./.env'});


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

const razorpayInstance = new razorpay({
 key_id: process.env.RAZORPAY_KEY_ID || "missing_key_id",
    key_secret: process.env.RAZORPAY_KEY_SECRET || "missing_key_secret"
})



const paymentRazorpay= async(req,res)=>{
    try{
        const {userId,planId}=req.body;
        const userData=await userModel.findById(userId);
        if(!userData || !planId){
            return res.json({success:false,message:'User not found'})
        }
        
        let credits,plan,amount,date;
        switch(planId){
            case 'Basic':
                plan='Basic'
                credits=100;
                amount=10;
                break;
            
            case 'Advanced':
                plan='Advanced'
                credits=500;
                amount=50;
                break;
            
            case 'Buisness':
                plan='Buisness'
                credits=500;
                amount=500;
                break;
            
            default:
                return res.json({success:false,message:'Invalid plan'})
        }

        date= Date.now()

        const transactionData={
            userId,
            plan,
            credits,
            amount,
            date
        }
        const newTransaction= await transactionModel.create(transactionData);


        const options={
            amount:amount*100,
            currency:process.env.CURRENCY,
            receipt:newTransaction._id
        }

        await razorpayInstance.orders.create(options, (error,order)=>{
            if(error){
                console.log(error)
                return res.json({success:false,message:error.message})
            }
            res.json({
                success:true,
                order
            })
        })
    }catch(error){
        console.log(error.message)  
        return res.json({success:false, message:error.message})
    }
}

const verifyPayment= async(req,res)=>{
    try{
        const {razorpay_order_id}=req.body.response;
        const orderInfo= await razorpayInstance.orders.fetch(razorpay_order_id);
        if(orderInfo.status==='paid'){
            const transaction= await transactionModel.findById(orderInfo.receipt);
            if(transaction.payment){
                return res.json({success:false,message:'Payment Failed'})
            }
            
            const user = await userModel.findById(transaction.userId);
            const creditBalance= user.creditBalance + transaction.credits;
            await userModel.findByIdAndUpdate(user._id,{creditBalance});
            await transactionModel.findByIdAndUpdate(transaction._id,{payment:true});

            res.json({
                success:true,
                message:'Credits added successfully',
            })  
            
        }else{
            return res.json({success:false,message:'Payment Failed'})
        }
    }catch(error){
        console.log(error.message)  
        return res.json({success:false, message:error.message})
    }
}

export {registerUser,loginUser,userCredit,paymentRazorpay,verifyPayment}