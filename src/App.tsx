import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import ProtectedRoute from './components/ProtectedRoute';



const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const UserProfile = lazy(() => import('./pages/UserProfile'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
