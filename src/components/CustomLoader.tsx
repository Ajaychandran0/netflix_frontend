import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const CustomLoader: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#141414',
        height: '100vh',
        width: '100vw',
      }}
    >
      <CircularProgress sx={{ color: '#e50914' }} />
    </Box>
  );
};

export default CustomLoader;
