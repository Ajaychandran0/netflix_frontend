import React from 'react';
import Header from './Header';
import { Box } from '@mui/material';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ backgroundColor: '#141414', minHeight: '100vh', color: 'white' }}>
      <Header />
      <Box sx={{ paddingTop: '64px' }}>{children}</Box>
    </Box>
  );
};

export default Layout;
