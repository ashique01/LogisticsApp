import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Frown, Home as HomeIcon, ArrowLeft } from 'lucide-react'; // Using lucide-react for icons

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4 font-sans text-gray-800">
      <div className="bg-white rounded-2xl shadow-xl p-10 sm:p-16 text-center max-w-lg w-full transform transition-all duration-500 ease-in-out scale-95 hover:scale-100">
        <Frown className="h-28 w-28 mx-auto text-blue-600 mb-8 drop-shadow-lg animate-bounce-once" />
        <h1 className="text-7xl sm:text-8xl font-extrabold text-blue-800 mb-6 leading-tight drop-shadow-md">
          404
        </h1>
        <p className="text-2xl sm:text-3xl font-semibold mb-4 text-gray-700">
          Oops! Page Not Found
        </p>
        <p className="text-lg text-gray-600 mb-10 leading-relaxed">
          It looks like the page you're looking for doesn't exist or has been moved.
          Don't worry, we'll help you get back on track!
        </p>

        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-full shadow-lg
                       bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800
                       transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105
                       focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-75"
          >
            <ArrowLeft className="mr-3 h-6 w-6" />
            Go Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-full shadow-lg
                       bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700
                       transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105
                       focus:outline-none focus:ring-4 focus:ring-teal-300 focus:ring-opacity-75"
          >
            <HomeIcon className="mr-3 h-6 w-6" />
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
