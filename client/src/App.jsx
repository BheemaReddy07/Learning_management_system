import { useState } from 'react'
import React from 'react'
import {Route,Routes} from 'react-router-dom'
import './App.css'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from './pages/Login'

import Navbar from './components/Navbar'
import Home from './pages/students/Home'
import Footer from './components/Footer'
 
function App() {
  

  return (
    <div className="bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">

      <div className='mx-4 sm:mx-[10%]'>
    <ToastContainer />
    <Navbar />
     
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
    </Routes>
    <Footer />
   </div>
    </div>
  )
}

export default App
