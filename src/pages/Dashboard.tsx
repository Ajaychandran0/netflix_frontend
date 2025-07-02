import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemText, Typography, Divider } from '@mui/material';
import VideoUpload from './dashboard/VideoUpload';
import VideoList from './dashboard/VideoList';
import UserList from './dashboard/UserList';
import Analytics from './dashboard/Analytics';

const sections = [
  { key: 'upload', label: 'Upload Video' },
  { key: 'videos', label: 'Manage Videos' },
  { key: 'users', label: 'User Management' },
  { key: 'analytics', label: 'Analytics' },
];

const Dashboard: React.FC = () => {
  const [section, setSection] = useState('upload');

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#141414', color: 'white' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: 220,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 220,
            boxSizing: 'border-box',
            backgroundColor: '#181818',
            color: 'white',
          },
        }}
      >
        <Typography variant="h6" sx={{ p: 2, fontWeight: 'bold' }}>Admin Panel</Typography>
        <Divider sx={{ background: '#333' }} />
        <List>
          {sections.map((s) => (
            <ListItem key={s.key} disablePadding>
              <ListItemButton selected={section === s.key} onClick={() => setSection(s.key)}>
                <ListItemText primary={s.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box sx={{ flexGrow: 1, p: 4 }}>
        {section === 'upload' && <VideoUpload />}
        {section === 'videos' && <VideoList />}
        {section === 'users' && <UserList />}
        {section === 'analytics' && <Analytics />}
      </Box>
    </Box>
  );
};

export default Dashboard;
