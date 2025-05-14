import { AppBar, Toolbar, Typography, Box, Avatar, Menu, MenuItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logout, login } from '../store/slices/authSlice';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { fetchUserProfile } from '../services/authService';
import { User } from '../types/auth';

const Header: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  console.log('Header', { isAuthenticated, user }, "in header");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    if (!user && !isAuthenticated) {
      fetchUserProfile()
        .then((user: User) => {
          dispatch(login(user));
        })
        .catch((error: unknown) => {
          console.error('Failed to fetch user profile:', error);
        });
    }
  }, [dispatch, user, isAuthenticated]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#141414', width: '100vw' }}>
      <Toolbar sx={{ px: '2rem', justifyContent: 'space-between', paddingTop: '1rem' }}>
        <Box sx={{ flexGrow: 1 }}>
          <a href="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
              alt="Netflix Logo"
              style={{ height: '36px' }}
            />
          </a>
        </Box>
        {isAuthenticated ? (
          <>
            <Avatar onClick={handleMenuOpen} sx={{ cursor: 'pointer' }}>
              {user?.firstName?.[0] || 'U'}
            </Avatar>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <Typography
            variant="body1"
            component="a"
            href="/login"
            sx={{ color: '#fff', textDecoration: 'none' }}
          >
            Login
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
