import React from 'react'
import { assets } from '../assets/assets'

const GenerateButton = () => {
return (
    <div className='flex flex-col items-center pb-16 text-center'>
        <h1 className='text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-800 py-6 md:py-8'>See The Magic Right Now</h1>
        <button className='sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full hover:scale-105 transition-all duration-700'>
            Generate Images
            <img src={assets.star_group} className='h-6' alt="" />
        </button>    
    </div>
)
}

export default GenerateButton
