import React from 'react'
import CodeEditor from '../components/CodeEditor'

function CodeGenerator() {
  const URL=`${import.meta.env.VITE_BACKEND_URL}/ai/get-code`
  const prompt=`write a c++ code to find factorial of a given number`
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