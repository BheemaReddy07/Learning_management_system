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
import MyLearning from './pages/students/MyLearning'
import Profile from './pages/students/Profile'
 
function App() {
  

  return (
    <div className="min-h-screen">


      <div className='mx-4 sm:mx-[10%]'>
    <ToastContainer />
    <Navbar />
     
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/my-learnings' element={<MyLearning />} />
      <Route path='/profile' element={<Profile />} />
    </Routes>
    <Footer />
   </div>
    </div>
  )
}

export default App
