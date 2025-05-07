// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import supabase from '../supabaseClient';  // default import

const AuthContext = createContext();

/**
 * Wrap your app in this provider.
 */
export const AuthContextProvider = ({ children }) => {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1) Fetch initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // 2) Subscribe to future auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // 3) Cleanup on unmount
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // 4) Helper methods
  const signUp = (email, password) =>
    supabase.auth.signUp({ email, password });

  const signIn = (email, password) =>
    supabase.auth.signInWithPassword({ email, password });

  const signOut = () =>
    supabase.auth.signOut().then(() => setUser(null));

  // 5) Optionally block UI until we know auth state
  if (loading) {
    return <div>Loading…</div>;
  }

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook for consuming auth context.
 */
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthContextProvider");
  return ctx;
};
