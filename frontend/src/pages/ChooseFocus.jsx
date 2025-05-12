import React, { useEffect, useState } from 'react';
import { useAuth }        from '../context/AuthContext';
import supabase           from '../supabaseClient';
import { useNavigate }    from 'react-router-dom';

export default function ChooseFocus() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [modality, setModality] = useState(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const handleNext = async () => {
    if (!modality) return;
    setLoading(true);
    setError('');
    const { data, error: supaError } = await supabase
      .from('profiles')
      .update({ modality })
      .eq('user_id', user.id);

    setLoading(false);
    if (supaError) {
      setError(supaError.message);
    } else {
      navigate('/dashboard');
    }
  };

  const baseBtn = 'w-1/2 py-12 border-2 rounded-lg shadow-lg transition text-3xl font-semibold';
  const selectedBtn = 'bg-gray-800 text-white border-gray-800';
  const unselectedBtn = 'bg-white text-gray-800 border-gray-500';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-gray-500 to-gray-700 bg-[length:200%_200%] animate-subtle-shift text-white">
      <h1 className="text-5xl font-bold mb-8">Choose your Focus:</h1>
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col items-center">
        <p className="text-lg text-gray-800 mb-6 text-center">
          Thanks for creating your account - choose your focus. Then you will be
          able to select more specific goals within your focus.
        </p>

        <div className="flex gap-6 w-full mb-6">
          <button
            type="button"
            className={`${baseBtn} ${
              modality === 'weightlifting' ? selectedBtn : unselectedBtn
            }`}
            onClick={() => setModality('Weightlifting')}
          >
            Weightlifting
          </button>
          <button
            type="button"
            className={`${baseBtn} ${
              modality === 'running' ? selectedBtn : unselectedBtn
            }`}
            onClick={() => setModality('Running')}
          >
            Running
          </button>
        </div>

        {error && (
          <p className="text-red-500 mb-4 text-center">{error}</p>
        )}

        <button
          type="button"
          onClick={handleNext}
          disabled={!modality || loading}
          className={`
            w-1/4 py-3 border-2 rounded-lg font-semibold shadow-lg transition
            ${modality
              ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
              : 'bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed'}
          `}
        >
          {loading ? 'Saving…' : 'Next Steps'}
        </button>
      </div>
    </div>
  );
}
