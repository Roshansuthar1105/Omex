import React from 'react'
import { useState, useEffect } from 'react';
import CodeEditor from '../components/CodeEditor'
import Loader from '../components/Loader'
import { useTheme } from '../context/ThemeContext';


function CodeGenerator() {
  const { isDark } = useTheme();
  
  const [loading, setLoading] = useState(true);
  const URL=`${import.meta.env.VITE_BACKEND_URL}/ai/get-code`
  const prompt=`write a c++ code to find factorial of a given number`
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      window.scrollTo(0, 0);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
    if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <Loader fullscreen size="xl" color="purple" text="Loading Code Generator Tool..." />
      </div>
    );
  }
  return (
    <>
    <div className=''>
      <CodeEditor URL={URL} prompt={prompt} />
      </div>  
    </>
  )
}
// Omex 
export default CodeGenerator