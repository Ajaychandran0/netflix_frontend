import React, { useEffect } from 'react';
import Header from './Header';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Box sx={{ backgroundColor: '#141414', minHeight: '100vh', color: 'white' }}>
      <Header />
      <Box sx={{ paddingTop: '64px' }}>{children}</Box>
    </Box>
  );
};

export default Layout;
