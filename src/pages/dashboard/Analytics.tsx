import React from 'react';
import { Paper, Typography } from '@mui/material';

const Analytics: React.FC = () => {
  // TODO: Fetch and display analytics
  return (
    <Paper sx={{ p: 3, backgroundColor: '#181818', color: 'white' }}>
      <Typography variant="h6">Analytics</Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        (Analytics and stats go here)
      </Typography>
    </Paper>
  );
};

export default Analytics;
