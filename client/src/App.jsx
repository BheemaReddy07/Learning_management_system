import { useContext, useState } from 'react'
import React from 'react'
import {Route,Routes, useNavigate,Navigate} from 'react-router-dom'
import './App.css'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from './pages/Login'

import Navbar from './components/Navbar'
import Home from './pages/students/Home'
import Footer from './components/Footer'
import MyLearning from './pages/students/MyLearning'
import Profile from './pages/students/Profile'
import { AppContext } from './context/AppContext'
 
const App = () => {
  const navigate = useNavigate();
  const {showLogin,setShowLogin,token} = useContext(AppContext)
  const isAuthenticated = () => {
    return token && token !== '';  // Returns true if token is present
  };

  
  return (
    <div className="min-h-screen">


      <div className='mx-4 sm:mx-[10%]'>
    <ToastContainer />
    <Navbar />
     {showLogin && <Login />}
    <Routes>
      <Route path='/' element={<Home />} />
      {isAuthenticated() ? (
            <>
              <Route path="/my-learnings" element={<MyLearning />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
              ""
          )}
      
    </Routes>
    <Footer />
   </div>
    </div>
  )
}

export default App
