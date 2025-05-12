// src/App.jsx
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import Dashboard   from './pages/Dashboard';
import SignIn      from './pages/SignIn';
import SignUp      from './pages/SignUp';
import ChooseFocus  from './pages/ChooseFocus';

function App() {
  const { user, signOut } = useAuth();

  return (
    <BrowserRouter>
      <nav className="p-4 bg-gray-800 text-white flex gap-4">
        {user ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/choosefocus">Choose Focus</Link>
            <button onClick={signOut}>Sign Out</button>
          </>
        ) : (
          <>
            <Link to="/">Home</Link>
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </nav>

      <Routes>
        {/* Public landing page */}
        <Route path="/" element={<LandingPage />} />

        {/* Protected dashboard */}
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/signin" replace />}
        />

        {/* Auth routes */}
        <Route
          path="/signin"
          element={!user ? <SignIn /> : <Navigate to="/dashboard" replace />}
        />
        <Route
          path="/signup"
          element={!user ? <SignUp /> : <Navigate to="/dashboard" replace />}
        />

        {/* Choose focus page */}
        <Route
          path="/choosefocus"
          element={user ? <ChooseFocus /> : <Navigate to="/" replace />}
        />

        {/* Fallback: send to home if no match */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
