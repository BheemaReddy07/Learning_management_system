import { useContext, useEffect, useState } from 'react'
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
import { Loader2 } from "lucide-react";


const FullPageLoader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a page load time (or listen for API calls)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Adjust based on actual loading time

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null; // Hide loader when loading is done

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-teal-50  dark:bg-gray-900 z-50">
      <div className="relative flex items-center justify-center w-24 h-24">
        <svg className="absolute w-24 h-24 animate-spin-slow" viewBox="0 0 86 86">
          <circle className="stroke-gray-300" cx="43" cy="43" r="40" strokeWidth="6" fill="none" />
          <circle className="stroke-blue-600 animate-dash" cx="43" cy="43" r="40" strokeWidth="6" fill="none" />
        </svg>
        <svg className="absolute w-16 h-16 animate-spin-reverse" viewBox="0 0 60 60">
          <circle className="stroke-gray-300" cx="30" cy="30" r="27" strokeWidth="6" fill="none" />
          <circle className="stroke-purple-600 animate-dash" cx="30" cy="30" r="27" strokeWidth="6" fill="none" />
        </svg>
        <svg className="absolute w-10 h-10 animate-spin-slow" viewBox="0 0 34 34">
          <circle className="stroke-gray-300" cx="17" cy="17" r="14" strokeWidth="6" fill="none" />
          <circle className="stroke-pink-600 animate-dash" cx="17" cy="17" r="14" strokeWidth="6" fill="none" />
        </svg>
      </div>
    </div>
  );
};

 


const App = () => {
  const navigate = useNavigate();
  const {showLogin,setShowLogin,token} = useContext(AppContext)
  const isAuthenticated = () => {
    return token && token !== '';  // Returns true if token is present
  };

  
  return (
    
    <div className="min-h-screen">
   <FullPageLoader />

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
