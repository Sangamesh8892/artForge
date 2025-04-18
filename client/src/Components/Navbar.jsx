import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'


const Navbar = () => {
    const {user,setShowLogin,logout,credit}=useContext(AppContext)
    const navigate=useNavigate()
  return (
  <>  
    <div className='flex items-center justify-between py-4'>
        <Link to='/' ><img src={assets.logo} alt="Logo" className='w-28 sm:w-32 lg:w-40'  /></Link>
        {
        user ? 
        <div className='flex items-center gap-5 sm:gap-3'>
            <button onClick={()=>navigate('/buycredit')} className='flex items-center gap-2 bg-blue-100 px-4 sm:px-6 sm:py-3 py-1.5 rounded-full text-sm sm:text-base hover:scale-105 transition-all duration-700'>
                <img className='w-5' src={assets.credit_star} alt="" />
                <p className='text-xs sm:text-sm font-medium text-gray-600'>Credit left {credit}</p>
            </button>
            <p className='text-gray-600 max-sm:hidden pl-4'>Hi, {user.name}</p> 
            <div className='relative group cursor-pointer'>
                <img src={assets.profile_icon} className='w-10 drop-shadow' alt="" />
                <div className='absolute hidden group-hover:block top-0 r-0 z-10 text-black rounded pt-12' >
                    <ul className='list-none bg-white m-0 p-2 bg-white rounded-md border text-sm shadow-lg'>
                        <li className='py-1 px-2 cursor-pointer pr-10' onClick={logout}>Logout</li>
                    </ul>
                </div>
            </div>
        </div>
        :
        <div className='flex items-center gap-2 sm:gap-5'> 
            <p onClick={()=>navigate('/buycredit')} className='cursor-pointer'>Pricing</p>
            <button onClick={()=>{setShowLogin(true)}} className='bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full'>Login</button>
        </div>
        }
        

    
     
    </div>
  </>
  )
}

export default Navbar
