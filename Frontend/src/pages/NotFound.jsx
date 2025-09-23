import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100 px-6">
      <div className="text-center space-y-6 max-w-lg">
        {/* Big 404 Heading */}
        <h1 className="text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          404
        </h1>

        {/* Sub-heading */}
        <h2 className="text-2xl md:text-3xl font-semibold">
          Oops! Page Not Found
        </h2>

        {/* Short description */}
        <p className="text-gray-400">
          The page you are looking for doesn’t exist or has been moved.  
          Let’s get you back on track.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-lg transition-all duration-300"
          >
            ⬅ Go Back Home
          </Link>

          <Link
            to="/contact"
            className="px-6 py-3 rounded-2xl bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 font-medium shadow-lg transition-all duration-300"
          >
            📩 Contact Support
          </Link>
        </div>

        {/* Optional: Search bar (if you want) */}
        {/* 
        <div className="mt-6">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        */}
      </div>
    </div>
  );
}
