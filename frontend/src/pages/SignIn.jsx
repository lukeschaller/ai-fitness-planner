import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    const { data, error } = await signIn(email, password);
    if (error) {
      setError(error.message);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-gray-500 to-gray-700 bg-[length:200%_200%] animate-subtle-shift text-white">
        <h1 className="text-5xl font-bold mb-8">Login</h1>
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <p className="text-lg text-gray-800 mb-6 text-center">Welcome back! Enter your information to login.</p>
        <form onSubmit={handleSignIn} className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 border text-gray-800 border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 border text-gray-800 border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
          <button
            type="submit"
            className="w-full py-3 mt-2 border-2 border-gray-500 text-gray-800 font-semibold rounded-lg shadow-lg transition text-lg"
          >
            Sign In
          </button>

          <Link
            to="/"
            className="w-full px-8 py-3 text-center border-2 border-gray-500 text-gray-800 font-semibold rounded-lg hover:bg-white hover:text-gray-600 transition text-xl"
          >
            Back to Home
          </Link>

          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
}
