import React from 'react'
// import { Link } from 'react-router-dom';
function NavBar() {
  return (
  <nav className="bg-gray-800 text-white py-4 px-8 absolute top-0 w-full">
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold cursor-pointer"><a to="/" className="hover:text-blue-400">AI Code Optimisation</a></h1>
    </div>
  </nav>
  )
}

export default NavBar;