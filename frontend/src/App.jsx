import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <h1 className="text-4xl font-bold mb-4">AI Fitness Planner</h1>
      <p className="text-lg mb-6 text-gray-300 text-center max-w-md">
        Your AI-powered personal trainer and running planner. Plan smarter workouts tailored to you.
      </p>
      <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg shadow transition">
        Get Started
      </button>
    </div>
  );
}

export default App
