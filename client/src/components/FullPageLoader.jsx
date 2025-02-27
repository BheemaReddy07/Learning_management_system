import React from "react";
 
import { useEffect, useState } from 'react'
 
 
 
const FullPageLoader = () => {
    const [isPageLoading, setIsPageLoading] = useState(true);
  
    useEffect(() => {
      const timer = setTimeout(() => setIsPageLoading(false), 1000); // Fallback in case "load" event is delayed
      window.addEventListener("load", () => setIsPageLoading(false));
      return () => clearTimeout(timer);
    }, []);
    
    if (!isPageLoading) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-teal-50 dark:bg-gray-900 z-50">
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


  export default FullPageLoader