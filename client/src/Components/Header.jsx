import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from "motion/react"
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
const Header = () => {
    const {user,setShowLogin}=useContext(AppContext)
    const navigate=useNavigate()
    const onClickHandler = () => {
        if(user){
            navigate('/result');
        }else{
            setShowLogin(true);
        }
    }
return (
    <motion.div className='flex flex-col items-center justify-center text-center my-16 md:my-24'
    initial={{ opacity: 0.1, y: 100 }}
    transition={{ duration: 1 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}>
        <motion.div className='text-stone-600 inline-flex items-center text-center gap-3 bg-white px-7 py-2 rounded-full border border-neutral-400 shadow-sm hover:shadow-md transition-shadow duration-300'
        initial={{ opacity: 0.0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay:0.2,duration: 0.8 }}
        viewport={{ once: true }}>
            <p className='font-medium'>
               Best Text to Image Converter
            </p>
            <img src={assets.star_icon} alt="" className='w-4 h-4' />
        </motion.div>

        <motion.h1 className='text-4xl mt-6 mb-3  tracking-tight max-w-[300px] sm:text-6xl md:text-7xl sm:max-w-[590px] md:max-w-[700px] bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent'
        initial={{ opacity: 0.0}}
        animate={{ opacity: 1 }}
        transition={{ delay:0.4,duration: 2 }}>
        
            Turn Text to <span className='text-blue-600'>Image</span>, in seconds.
        </motion.h1>
        <motion.p className='text-neutral-600 max-w-[280px] sm:max-w-[500px] text-sm sm:text-base md:text-lg'
        initial={{ opacity: 0.0, y: 20 }}
        animate={{ opacity: 1,y: 0 }}
        transition={{ delay:0.6,duration: 0.8 }}>
            Create stunning, realistic images from your text descriptions using our AI-powered image generator.
        </motion.p>
        <motion.button className='sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full'
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0.0, }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7}}
        onClick={()=>{onClickHandler()}}>
            Generate Images
            <img className='h-6' src={assets.star_group} alt=""/>
        </motion.button>
        <motion.div className='flex flex-wrap justify-center gap-3 mt-16'
        initial={{ opacity: 0.0, y: 20 }}
        animate={{ opacity: 1,y: 0 }}
        transition={{ delay:1,duration:1 }}>
            {Array(6).fill('').map((item, index) => (
                <motion.img 
                 src={index % 2 ==0 ? assets.sample_img_1 : assets.sample_img_2} alt="" className='w-24 rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10' key={index} />
            )
            )}
        </motion.div>
        <p className='mt-2 text-neutral-600'>Generated images from Art Forge</p>
    </motion.div>

    

)
}

export default Header
