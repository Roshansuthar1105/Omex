import React from 'react'
import { useState, useEffect } from 'react';
import CodeEditor from '../components/CodeEditor'
import {useTheme} from '../context/ThemeContext';
import Loader from '../components/Loader';
import FeedbackButton from '../components/FeedbackButton';

function CodeComplexity() {
    const {isDark} = useTheme();
    const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      window.scrollTo(0, 0);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
    // const URL = "http://localhost:5000/ai/get-complexity"
    const URL=`${import.meta.env.VITE_BACKEND_URL}/ai/get-complexity`
    const prompt=
    `int fact(int n){
        if(n<=1){
            return 1;
        }else{
            return n*fact(n-1);
        } 
}`;
if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <Loader fullscreen size="xl" color="purple" text="Loading Complexity Tool..." />
      </div>
    );
  }
    return (
        <div className='' >
            <CodeEditor URL={URL} prompt={prompt} />
            
            {/* Feedback Button */}
            <FeedbackButton toolName="Code Complexity Analyzer" />
        </div>
    )
}

export default CodeComplexity