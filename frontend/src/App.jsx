// src/App.jsx
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import SignIn    from './pages/SignIn';
import SignUp    from './pages/SignUp';

function App() {
  const { user, signOut } = useAuth();

  return (
    <BrowserRouter>
      <nav className="p-4 bg-gray-800 text-white flex gap-4">
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={signOut}>Sign Out</button>
          </>
        ) : (
          <>
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </nav>

      <Routes>
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/signin" replace />}
        />
        <Route
          path="/signin"
          element={!user ? <SignIn /> : <Navigate to="/dashboard" replace />}
        />
        <Route
          path="/signup"
          element={!user ? <SignUp /> : <Navigate to="/dashboard" replace />}
        />
        <Route
          path="*"
          element={<Navigate to={user ? '/dashboard' : '/signin'} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
