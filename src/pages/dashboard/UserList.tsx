import React from 'react';
import { Paper, Typography } from '@mui/material';

const UserList: React.FC = () => {
  // TODO: Fetch and display users
  return (
    <Paper sx={{ p: 3, backgroundColor: '#181818', color: 'white' }}>
      <Typography variant="h6">User Management</Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        (User list and management actions go here)
      </Typography>
    </Paper>
  );
};

export default UserList;
