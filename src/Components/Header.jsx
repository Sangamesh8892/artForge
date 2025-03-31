import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
return (
    <div className='flex flex-col items-center justify-center text-center my-16 md:my-24'>
        <div className='text-stone-600 inline-flex items-center text-center gap-3 bg-white px-7 py-2 rounded-full border border-neutral-400 shadow-sm hover:shadow-md transition-shadow duration-300'>
            <p className='font-medium'>
               Best Text to Image Converter
            </p>
            <img src={assets.star_icon} alt="" className='w-4 h-4' />
        </div>

        <h1 className='text-4xl mt-6 mb-3  tracking-tight max-w-[300px] sm:text-6xl md:text-7xl sm:max-w-[590px] md:max-w-[700px] bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent'>
            Turn Text to <span className='text-blue-600'>Image</span>, in seconds.
        </h1>
        <p className='text-neutral-600 max-w-[280px] sm:max-w-[500px] text-sm sm:text-base md:text-lg'>
            Create stunning, realistic images from your text descriptions using our AI-powered image generator.
        </p>
        <button className='sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full hover:scale-105 transition-all duration-700'>
            Generate Images
            <img className='h-6' src={assets.star_group} alt=""/>
        </button>
        <div className='flex flex-wrap justify-center gap-3 mt-16'>
            {Array(6).fill('').map((item, index) => (
                <img 
                 src={index % 2 ==0 ? assets.sample_img_1 : assets.sample_img_2} alt="" className='w-24 rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10' key={index} />
            )
            )}
        </div>
        <p className='mt-2 text-neutral-600'>Generated images from Art Forge</p>
    </div>

    

)
}

export default Header
