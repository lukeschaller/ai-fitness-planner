import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-gray-500 to-gray-700 bg-[length:200%_200%] animate-subtle-shift text-white">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-4">Welcome to AI Powered Fitness Planner</h1>
        <p className="text-xl">Personalized weightlifting & running plans powered by AI</p>
      </header>

      <div className="flex space-x-4">
        <Link
          to="/signup"
          className="px-8 py-4 w-60 text-center bg-white text-gray-600 font-semibold rounded-lg shadow border-2 border-transparent hover:bg-transparent hover:text-white hover:border-white transition text-xl"
        >
          Create Account
        </Link>
        <Link
          to="/signin"
          className="px-8 py-4 w-60 text-center border-2 border-white font-semibold rounded-lg hover:bg-white hover:text-gray-600 transition text-xl"
        >
          Login
        </Link>
      </div>

      <footer className="absolute bottom-4 text-sm opacity-75">
        © 2025 AI Fitness Planner
      </footer>
    </div>
  );
}
