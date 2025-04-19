import React, { useContext, useState, useEffect } from 'react'
import {assets} from '../assets/assets'
import {motion} from 'framer-motion'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1)
  const [loading, setLoading] = useState(false)
  const [loadingImage, setLoadingImage] = useState(false)
  const [input, setInput] = useState('')
  const [error, setError] = useState(null)
  const {generateImage} = useContext(AppContext)
  
  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoadingImage(true)
    if(input){
      const image= await generateImage(input)
      if(image){
        setLoading(true)
        setImage(image)
        setLoadingImage(false)
    }else{
        setLoadingImage(false)
        setError("Failed to generate image")
        toast.error("Failed to generate image")
      }
    }
  }

  const handleGenerateAnother = () => {
    setLoading(false)
    setImage(assets.sample_img_1)
    setInput('')
    setError(null)
  }

  return (
    <motion.form
      initial={{opacity:0.2, y:100}}
      transition={{duration:1}}
      whileInView={{opacity:1, y:0}}
      viewport={{once:true}}
      onSubmit={onSubmitHandler} 
      className='flex flex-col items-center justify-center min-h-[90vh]'
    >
      <div>
        <div className='relative'>
          {error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-sm">
              <p>Error: {error}</p>
              <p className="text-sm">Please try again with a different prompt</p>
            </div>
          ) : (
            <img 
              src={image} 
              alt={loadingImage ? "Generating..." : "Generated image"} 
              className='max-w-sm rounded' 
              onError={(e) => {
                console.error("Image failed to load")
                e.target.src = assets.sample_img_1
                setError("Failed to display generated image")
              }}
            />
          )}
          
          {loadingImage && (
            <span className="absolute bottom-0 left-0 h-1 bg-blue-500 w-full transition-all duration-[10s]"></span>
          )}
        </div>
        
        {loadingImage && <p className="text-center mt-2">Generating your image...</p>}
        
        {!loading ? (
          <div className='flex w-full max-w-xl bg-neutral-500 text-white text-sm rounded-full p-0.5 mt-10'>
            <input 
              onChange={(e) => setInput(e.target.value)} 
              value={input}
              type="text" 
              placeholder='Describe what you want to Generate' 
              className='flex-1 bg-transparent outline-none ml-8 pr-3 truncate max-sm:text-xs'
            />
            <button 
              type='submit' 
              disabled={!input || loadingImage}
              className='bg-zinc-900 px-6 sm:px-10 py-3 rounded-full whitespace-nowrap disabled:opacity-50'
            >
              Generate
            </button>
          </div>
        ) : (
          <div className='flex flex-wrap gap-2 justify-center text-sm p-0.5 mt-10 rounded-full'>
            <button
              type="button"
              onClick={handleGenerateAnother}
              className='bg-transparent border border-zinc-900 text-black px-8 sm:px-15 py-3 rounded-full cursor-pointer'
            >
              Generate Another
            </button>
            {!error && image !== assets.sample_img_1 && (
              <a 
                href={image} 
                download={`artforge-${Date.now()}.png`}
                className='bg-zinc-900 text-white px-10 py-3 rounded-full cursor-pointer'
              >
                Download
              </a>
            )}
          </div>
        )}
      </div>
    </motion.form>
  )
}

export default Result
