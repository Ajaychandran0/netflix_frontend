import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import ProtectedRoute from './components/common/ProtectedRoute';
import AdminRoute from './components/common/AdminRoute';
import Dashboard from './pages/Dashboard';



const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const UserProfile = lazy(() => import('./pages/UserProfile'));
const Upload = lazy(() => import('./pages/Upload'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
      <Route path="/upload" element={<AdminRoute><Upload /></AdminRoute>} />
      <Route path="/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
