import { useEffect, type ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { fetchUserProfile } from '../../services/authService';
import { login, logout } from '../../store/slices/authSlice';
import CustomLoader from './CustomLoader';

export default function AdminRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isAdmin, user } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated || user) return;

    let active = true;
    fetchUserProfile()
      .then((profile) => {
        if (active) dispatch(login(profile));
      })
      .catch(() => {
        if (active) dispatch(logout());
      });

    return () => {
      active = false;
    };
  }, [dispatch, isAuthenticated, user]);

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user) return <CustomLoader />;
  return isAdmin ? <>{children}</> : <Navigate to="/" replace />;
}
