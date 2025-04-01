import React from 'react'
import { assets } from '../assets/assets'
import {motion} from 'motion/react'
const description = () => {
  return (
    <motion.div className='flex flex-col items-center justify-center my-24 p-6 md:px-28'
    initial={{opacity:0, y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1, y:0}}
    viewport={{once:true}}>
            <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Create AI images</h1>
            <p className='text-grey-500 mb-8'>Generate stunning visuals from text using advanced AI technology. Unleash your creativity and bring your ideas to life effortlessly.</p>

            <div className='flex flex-col gap-4 md:gap-14 md:flex-row items-center mt-8'>
              <img className='w-80 xl:96 rounded-lg' src={assets.sample_img_1} alt="" />
              <div>
                <h2 className='text-3xl font-medium max-w-lg mb-4'>Sample AI-Generated Image</h2>
                <p className='text-gray-500 mb-4'>
                    With ArtForge, you can transform your imagination into reality. Whether you're an artist, designer, or just someone with a creative spark, our AI-powered tools make it easy to bring your ideas to life. Explore endless possibilities and create visuals that captivate and inspire.
                  </p>
                  <p className='text-gray-500 mb-4'>
                    ArtForge leverages cutting-edge AI algorithms to ensure every image is unique and tailored to your input. Whether you're crafting visuals for personal projects or professional presentations, our platform provides the tools you need to stand out. Dive into a world of endless creativity and let your ideas take shape like never before. Experience the future of design with ArtForge today.
                  </p>
              </div>
            </div>
    </motion.div>
  )
}

export default description
