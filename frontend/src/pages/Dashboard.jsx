import React, { useEffect, useState } from 'react';
import { useAuth }        from '../context/AuthContext';
import supabase           from '../supabaseClient';

export default function Dashboard() {
  const { user } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [loading,   setLoading]   = useState(true);

  useEffect(() => {
    if (!user) return;

    const loadProfile = async () => {
      setLoading(true);
      // fetch only the first_name column
      const { data, error } = await supabase
        .from('profiles')
        .select('first_name')
        // if your PK column is `id`:
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error loading profile:', error.message);
      } else {
        setFirstName(data.first_name);
      }
      setLoading(false);
    };

    loadProfile();
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-500 to-gray-700 bg-[length:200%_200%] animate-subtle-shift text-white">
      {/* center + pad everything */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-white">

        {/* Header */}
        <header className="flex items-center justify-between mb-2">
          <div className="text-xl font-bold">Logo</div>
          <div className="text-3xl font-extrabold">
            {loading ? 'Loading…' : `Welcome, ${firstName}!`}
          </div>
          <button className="bg-white text-gray-800 px-4 py-2 rounded-lg">
            Settings
          </button>
        </header>

        {/* Focus Plan Title */}
        <div className="text-center mb-6">
          <div className="text-2xl font-bold">{'{focus}'} Plan</div>
        </div>

        <hr className="border-gray-700 mb-6" />

        {/* Top 3 cards */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg h-32 flex items-center justify-center">
            <p className="text-lg text-gray-800 text-center">This week overview</p>
          </div>
          <div className="bg-white rounded-lg h-32 flex items-center justify-center">
            <p className="text-lg text-gray-800 text-center">AI Outlook</p>
          </div>
          <div className="bg-white rounded-lg h-32 flex items-center justify-center">
            <p className="text-lg text-gray-800 text-center">Full plan overview</p>
          </div>
        </div>

        <hr className="border-gray-700 mb-6" />

        {/* Middle chart */}
        <div className="bg-white rounded-lg h-64 mb-6 flex items-center justify-center">
            <p className="text-lg text-gray-800 text-center">Progress chart for the whole plan</p>
        </div>

        <hr className="border-gray-700 mb-6" />

        {/* Bottom week grid */}
        <div className="grid grid-cols-7 gap-6">
          <div className="bg-white rounded-lg h-32 flex items-center justify-center">
            <p className="text-lg text-gray-800 text-center">Sunday workout</p>
          </div>
          <div className="bg-white rounded-lg h-32 flex items-center justify-center">
            <p className="text-lg text-gray-800 text-center">Monday workout</p>
          </div>
          <div className="bg-white rounded-lg h-32 flex items-center justify-center">
            <p className="text-lg text-gray-800 text-center">Tuesday workout</p>
          </div>
          <div className="bg-white rounded-lg h-32 flex items-center justify-center">
            <p className="text-lg text-gray-800 text-center">Wednesday workout</p>
          </div>
          <div className="bg-white rounded-lg h-32 flex items-center justify-center">
            <p className="text-lg text-gray-800 text-center">Thursday workout</p>
          </div>
          <div className="bg-white rounded-lg h-32 flex items-center justify-center">
            <p className="text-lg text-gray-800 text-center">Friday workout</p>
          </div>
          <div className="bg-white rounded-lg h-32 flex items-center justify-center">
            <p className="text-lg text-gray-800 text-center">Saturday workout</p>
          </div>
        </div>

      </div>
    </div>
  );
}
