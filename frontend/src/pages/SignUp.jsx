import React, { useState } from 'react';
import { useAuth }         from '../context/AuthContext';
import supabase            from '../supabaseClient';
import { useNavigate }     from 'react-router-dom';

export default function SignUp() {
  const { signUp } = useAuth();
  const navigate   = useNavigate();

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
    age: '',
    height: '',
    weight: '',
    fitness_level: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [loading,  setLoading] = useState(false);

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (form.password !== form.confirm_password) {
      setErrorMsg("Passwords don't match");
      return;
    }

    setLoading(true);

    const { data: signUpData, error: signUpError } = await signUp(form.email, form.password)
    if (signUpError) {
      setErrorMsg(signUpError.message);
      setLoading(false);
      return;
    }

    const user = signUpData.user ?? signUpData

    const { error: signInError } = 
      await supabase.auth.signInWithPassword({
        email:    form.email,
        password: form.password,
      })
    if (signInError) {
      setErrorMsg("Could not sign in after sign up: " + signInError.message)
      setLoading(false)
      return
    }

    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .insert({
        user_id:       user.id,
        first_name:    form.first_name,
        last_name:     form.last_name,
        age:           form.age ? parseInt(form.age) : null,
        height_in:     form.height ? parseFloat(form.height) : null,
        weight_lbs:    form.weight ? parseFloat(form.weight) : null,
        fitness_level: form.fitness_level,
      })
      .select();

    if (profileError) {
      setErrorMsg(profileError.message);
    } else {
      navigate('/dashboard');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-gray-500 to-gray-700 bg-[length:200%_200%] animate-subtle-shift text-white">
      <h1 className="text-5xl font-bold mb-8">Create an Account</h1>
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <p className="text-lg text-gray-800 mb-6 text-center">Before we get started, let’s get some basic details about you:</p>
        <form onSubmit={handleSignUp} className="flex flex-col gap-4">

            {/* Name */}
            <div className="flex gap-2">
              <input
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                placeholder="First name"
                className="w-1/2 p-3 border text-gray-800 border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
              />
              <input
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                placeholder="Last name"
                className="w-1/2 p-3 border text-gray-800 border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
              />
            </div>

            {/* Email & Password */}
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email address"
              className="w-full p-3 border text-gray-800 border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-3 border text-gray-800 border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
            <input
              name="confirm_password"
              type="password"
              value={form.confirm_password}
              onChange={handleChange}
              placeholder="Confirm password"
              className="w-full p-3 border text-gray-800 border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />

            {/* Metrics */}
            <div className="flex gap-2">
              <input
                name="age"
                type="number"
                value={form.age}
                onChange={handleChange}
                placeholder="Age"
                className="w-1/5 p-3 border text-gray-800 border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              <input
                name="height"
                type="number"
                value={form.height}
                onChange={handleChange}
                placeholder="Height (in)"
                className="w-2/5 p-3 border text-gray-800 border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <input
                name="weight"
                type="number"
                value={form.weight}
                onChange={handleChange}
                placeholder="Weight (lbs)"
                className="w-2/5 p-3 border text-gray-800 border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>

            {/* Fitness Level */}
            <input
              name="fitness_level"
              value={form.fitness_level}
              onChange={handleChange}
              placeholder="Fitness level"
              className="w-full p-3 border text-gray-800 border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            />

            {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-3 text-center border-2 border-gray-500 text-gray-800 font-semibold rounded-lg hover:bg-white hover:text-gray-600 transition text-xl"
            >
              {loading ? 'Working…' : "Let's get started!"}
            </button>
          </form>
      </div>
    </div>
  );
}
