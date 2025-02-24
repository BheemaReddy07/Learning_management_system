import React from 'react'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
    const navigate = useNavigate()
  
    return (
        <div className='flex bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg px-6 sm:px-10 md:px-16 lg:px-20 my-20 '>
            {/* --left side (Text) -- */}
            <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>
                <div className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white'>
                    <p>Welcome to <span className="text-yellow-300">Rgukt Ongole</span></p>
                    <p className='mt-4'>Access Exclusive Courses & Learn from Top Faculty</p>
                </div>
                <button 
                    onClick={() => { navigate('/courses'); scrollTo(0,0) }} 
                    className='bg-white text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all'>
                    Explore Courses
                </button>
            </div>

            {/* --right side (Image) -- */}
            <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
                <img className='w-full absolute bottom-0 right-0 max-w-medium' 
                    src="appointment_img.png" alt="College LMS Banner" />
            </div>
        </div>
    )
}

export default Banner
