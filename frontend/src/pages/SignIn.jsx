// src/pages/SignIn.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';   // <-- hook, not AuthContext
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const { signIn } = useAuth();
  const navigate    = useNavigate();
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');

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
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Welcome to AI-Powered Fitness Planner!</h1>
      <h2 className="text-2xl mb-4">Sign In</h2>
      <form onSubmit={handleSignIn} className="flex flex-col gap-2">
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
        <button type="submit" className="mt-4 p-2 bg-blue-600 rounded">
          Sign In
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default SignIn;
