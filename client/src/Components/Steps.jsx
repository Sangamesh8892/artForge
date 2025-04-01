import React from 'react'
import { stepsData } from '../assets/assets'
import {motion} from 'framer-motion'

const Steps = () => {
  return (
    <motion.div className='flex flex-col items-center justify-center text-center my-32 '
    initial={{opacity:0, y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1, y:0}}
    viewport={{once:true}}>
      <h1 className='text-3xl sm:text-4xl font-semibold mb-2'> Follow these simple steps to transform your text into stunning images </h1>
      <p className='text-lg text-grey-600 mb-8'>Transform Words into Stunnig Images</p>
      <div className='space-y-4 w-full max-w-3xl text-sm'>
            {stepsData.map((item,index)=>(
                <motion.div key={index} className='flex items-center gap-4 p-5 px-8 bg-white/30 shadow-md border cursor-pointer rounded-lg '
                initial={{opacity:0, x:-50}}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{delay:0.2*(index+1),duration:0.8,ease:'easeInOut'}}
                whileInView={{opacity:1, x:0}}
                viewport={{once:true}}>   
                    <img width={40} src={item.icon} alt="" />
                    <div>
                        <h2 className='text-xl font-medium'>{item.title}</h2>
                        <p className='text-grey-500'>{item.description}</p>
                    </div>
                </motion.div>
            ))}
      </div>
    </motion.div>
  )
}

export default Steps
