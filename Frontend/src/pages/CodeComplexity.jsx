import React from 'react'
import CodeEditor from '../components/CodeEditor'

function CodeComplexity() {
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
    return (
        <div className='' >
            <CodeEditor URL={URL} prompt={prompt} />
        </div>
    )
}

export default CodeComplexity