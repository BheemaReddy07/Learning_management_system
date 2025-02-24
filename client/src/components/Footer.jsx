import React from 'react'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate()

  return (
    <div className='md:mx-10 border-t-4 mt-40'>

      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr_1fr] gap-14 my-10  text-sm'>
        {/* --Left Section (About) -- */}
        <div>
          <h1 onClick={() => navigate("/")} className=" font-extrabold text-2xl cursor-pointer">
            OngoLearn
          </h1>
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>
            OngoLearn is your gateway to quality online education. Learn from expert instructors, earn certifications, and upskill for a better future.
          </p>
        </div>

        {/* --Middle Section (Company) -- */}
        <div>
          <p className='text-xl font-medium mb-5'>Company</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li className='cursor-pointer' onClick={() => navigate('/courses')}>Courses</li>
            <li className='cursor-pointer' onClick={() => navigate('/instructors')}>Instructors</li>
            <li className='cursor-pointer' onClick={() => navigate('/blog')}>Blog</li>
            <li className='cursor-pointer' onClick={() => navigate('/privacy-policy')}>Privacy Policy</li>
          </ul>
        </div>

        {/* --Student Resources Section -- */}
        <div>
          <p className='text-xl font-medium mb-5'>Student Resources</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li className='cursor-pointer' onClick={() => navigate('/faq')}>FAQs</li>
            <li className='cursor-pointer' onClick={() => navigate('/support')}>Support Center</li>
            <li className='cursor-pointer' onClick={() => navigate('/community')}>Student Community</li>
          </ul>
        </div>

        {/* --Right Section (Contact) -- */}
        <div>
          <p className='text-xl font-medium mb-5'>Get in Touch</p>
          <ul className='flex flex-col gap-3 text-gray-600'>
            <li>+91 77994 47698</li>
            <li><a href='mailto:bheemareddy29102003@gmail.com'>bheemareddy29102003@gmail.com</a></li>
          </ul>
        </div>
      </div>

      {/* --Copyright Section -- */}
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>
          © {new Date().getFullYear()} OngoLearn - Empowering Learning. All Rights Reserved.
        </p>
      </div>
      
    </div>
  )
}

export default Footer
