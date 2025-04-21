import React, { useContext } from 'react'
import { assets, plans } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import {motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
const BuyCredit = () => {
  const {user,backendUrl,loadCreditsData,token,setShowLogin} =useContext(AppContext)
  const navigate=useNavigate()

  const paymentRazorPay = async (planId)=>{
    try{
      if(!user){
        setShowLogin(true)
        return
      }
      const {data}=await axios.post(`${backendUrl}/api/user/pay-razor`,{planId},{headers:{token}})
      
      const initPay = async (order)=>{
        const options={
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: order.currency,
          name: 'Credits Payment',
          description: 'Credits Payment',
          order_id: order.id,
          receipt: order.receipt,
          handler: async (response)=>{
            try{
              const {data}=await axios.post(`${backendUrl}/api/user/verify-payment`,{response},{headers:{token}})
              if(data.success){
                loadCreditsData()
                navigate('/')
                toast.success("Payment Successful")
              }
            }catch(error){
              toast.error(error.message)
            }
          }
        }
        const rzp= new window.Razorpay(options)
        rzp.open()

      }
      if(data.success){
        initPay(data.order)
      }

    }catch(error){
      toast.error(error.message)
    
  }}

  return (
    <motion.div
    initial={{opacity:0.2, y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1, y:0}}
    viewport={{once:true}}
    className='min-h-[80vh] text-center p-14 mb-10 bg-gray-100'>
      <button className='border border-gray-400 px-10 py-2 rounded-full mb-7 hover:bg-gray-200 transition-colors duration-300'>
        Our Plans
      </button>
      <h1 className='text-center text-3xl font-medium mb-7 sm:mb-10 text-gray-800'>
        Choose the plans
      </h1>

      <div className='flex flex-col sm:flex-row gap-5 justify-center text-left'>
        {plans.map((item, index) => (
          <div
            key={index}
            className='bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-500 hover:scale-105 transition-transform duration-500 ease-in-out'
          >
            <img width={40} src={assets.logo_icon} alt="" />
            <p className='mt-3 mb-1 font-semibold text-gray-700'>{item.id}</p>
            <p className='text-sm text-gray-600'>{item.desc}</p>
            <p className='mt-7'>
              <span className='text-3xl font-medium text-gray-800'>₹{item.price}</span> / {item.credits} Credits
            </p>

            <button className='mt-5 bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300' onClick={()=>{item.id}} onClickCapture={()=>{paymentRazorPay(item.id)}}>
              {user? 'Buy Now' : 'Get Started'}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default BuyCredit