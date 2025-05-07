// src/pages/SignUp.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const { signUp }   = useAuth();
  const navigate     = useNavigate();
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { data, error } = await signUp(email, password);
    if (error) {
      setError(error.message);
    } else {
      // Optionally you could check data.session vs. needing email confirm
      navigate('/dashboard');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Welcome to AI-Powered Fitness Planner!</h1>
      <h2 className="text-2xl mb-4">Sign Up</h2>
      <form onSubmit={handleSignUp} className="flex flex-col gap-2">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          className="p-2 rounded bg-gray-800 text-white"
          required
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          className="p-2 rounded bg-gray-800 text-white"
          required
        />
        <button type="submit" className="mt-4 p-2 bg-green-600 rounded">
          Create Account
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default SignUp;
