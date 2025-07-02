import React from 'react';
import { Paper, Typography } from '@mui/material';

const VideoList: React.FC = () => {
  // TODO: Fetch and display videos
  return (
    <Paper sx={{ p: 3, backgroundColor: '#181818', color: 'white' }}>
      <Typography variant="h6">Manage Videos</Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        (Video list and management actions go here)
      </Typography>
    </Paper>
  );
};

export default VideoList;
