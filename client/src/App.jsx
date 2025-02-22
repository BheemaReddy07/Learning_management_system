import { useState } from 'react'
import React from 'react'
import {Route,Routes} from 'react-router-dom'
import './App.css'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from './pages/Login'
import Home from './pages/Home'
function App() {
  

  return (
    <div className='mx-4 sm:mx-[10%]'>
    <ToastContainer />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
    </Routes>
   </div>
  )
}

export default App
