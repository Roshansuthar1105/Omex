import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Markdown from 'react-markdown';
import { useTheme } from '../context/ThemeContext';

function ChatComponent() {
  const { isDark } = useTheme();
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [savedResponses, setSavedResponses] = useState({});
  const [editing, setEditing] = useState(null);
  const [newPrompt, setNewPrompt] = useState('');

  useEffect(() => {
    const storedResponses = localStorage.getItem('savedResponses');
    if (storedResponses) {
      setSavedResponses(JSON.parse(storedResponses));
    }
    // console.log(savedResponses,savedResponses.length)
  }, []);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/ai/get-code', { prompt: input });
      setResponse(response.data);
      const date = new Date();
      const expirationDate = new Date(date.getTime() + 30 * 24 * 60 * 60 * 1000);
      const responseObj = { response: response.data, expirationDate: expirationDate.getTime() };
      const updatedResponses = { ...savedResponses, [input]: responseObj };
      setSavedResponses(updatedResponses);
      localStorage.setItem('savedResponses', JSON.stringify(updatedResponses)); 
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (key) => {
    setEditing(key);
    setNewPrompt(key);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/ai/get-code', { prompt: newPrompt });
      const updatedResponses = { ...savedResponses };
      delete updatedResponses[editing];
      updatedResponses[newPrompt] = { response: response.data, expirationDate: new Date().getTime() };
      setSavedResponses(updatedResponses);
      localStorage.setItem('savedResponses', JSON.stringify(updatedResponses));
      setEditing(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = (key) => {
    const updatedResponses = { ...savedResponses };
    delete updatedResponses[key];
    setSavedResponses(updatedResponses);
    localStorage.setItem('savedResponses', JSON.stringify(updatedResponses));
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-900 rounded-lg shadow-md h-screen">
      <div className="flex items-center justify-center mb-4">
        <img
          src={isDark ? "/omex-text-logo-white.svg" : "/omex-text-logo.svg"}
          alt="Omex AI Logo"
          className="h-12 w-auto"
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-4 overflow-y-scroll h-4/5">
        <div className="mt-4">
          <h2 className="text-lg font-bold text-gray-300">Response:</h2>
          <Markdown className="text-gray-400">{response}</Markdown>
        </div>
        {Object.keys(savedResponses).length > 0 && (<div className="mt-4 overflow-y-scroll h-3/5" style={{ overflowY: 'scroll', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
          <h2 className="text-lg font-bold text-gray-300">Saved Responses:</h2>
          <ul className="list-none p-0 m-0">
            {Object.keys(savedResponses).map((key) => (
              <li key={key} className="p-4 m-4 bg-gray-800 rounded-lg shadow-md">
                {editing === key ? (
                  <input 
                    type="text" 
                    value={newPrompt} 
                    onChange={(e) => setNewPrompt(e.target.value)} 
                    className="p-2 pl-10 text-sm text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 w-full"
                  />
                ) : (
                  <p className="text-base text-gray-300">Command: {key}</p>
                )}
                <Markdown className="text-gray-400">{savedResponses[key].response}</Markdown>
                <p className="text-base text-gray-500">Expiration Date: {new Date(savedResponses[key].expirationDate).toLocaleString()}</p>
                <div className="flex justify-between">
                  {editing === key ? (
                    <button onClick={handleSaveEdit} className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">Save</button>
                  ) : (
                    <button onClick={() => handleEdit(key)} className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">Edit</button>
                  )}
                  <button onClick={() => handleDelete(key)} className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="fixed bottom-0 left-0 right-0 p-4 bg-gray-900 rounded-lg shadow-md flex flex-row gap-4">
        <input type="text" value={input} onChange={handleInputChange} placeholder="Command line" className="p-2 pl-10 text-sm text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 w-7/8" />
        <button type="submit" className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg w-1/8 cursor-pointer">Submit</button>
      </form>
    </div>
  );
}

export default ChatComponent;

