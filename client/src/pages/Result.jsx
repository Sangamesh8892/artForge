import React, { useState } from 'react'
import {assets} from '../assets/assets'
import {motion} from 'framer-motion'
const Result = () => {
  const [image,setImage]= useState(assets.sample_img_1)
  const [loading,setLoading]= useState(true)
  const [loadingImage,setLoadingImage]= useState(true)
  const [input,setInput]= useState('')

  const onSubmitHandler= async (e)=>{

  }
  return (
    <motion.form
    initial={{opacity:0.2, y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1, y:0}}
    viewport={{once:true}}
    onSubmit={onSubmitHandler} className='flex flex-col items-center justify-center min-h-[90vh]'>
<div>
      <div className='relative'>
        <img src={image} alt="" className='max-w-sm rounded' />
        <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${loadingImage ? 'w-full transition-all duration-[10s]' : 'w-0'}`}></span>

      </div>
      <p className={!loadingImage ? 'hidden' : ''}>Loading......</p>
    { !loading && 
    <div className='flex w-full max-w-xl bg-neutral-500 text-white text-sm rounded-full p-0.5 mt-10'>
      <input 
      onChange={(e)=>setInput(e.target.value)} value={input}
       type="text" placeholder='Describe what you want to Generate' className='flex-1 bg-transparent outline-none ml-8 pr-3 truncate max-sm:text-xs'/>
      <button type='submit' className='bg-zinc-900 px-6 sm:px-10 py-3 rounded-full whitespace-nowrap'>Genrate</button>
    </div>}
    </div>
      {loading && 
    <div className='flex flex-wrap gap-2 justify-center text-white text-sm p-0.5 mt-10 rounded-full'>
      <p onClick={()=>{setLoading(false)}} className='bg-transparent border border-zinc-900 text-black px-8 sm:px-15 py-3 rounded-full cursor-pointer'>Generate Another</p>
      <a href={image} download className='bg-zinc-900 px-10 py-3 rounded-full  cursor-pointer '>Download</a>
    </div>}
    </motion.form>
  )
}

export default Result
