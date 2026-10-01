import { AppBar, Toolbar, Typography, Box, Avatar, Menu, MenuItem, Button, Stack } from '@mui/material';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import { useDispatch } from 'react-redux';
import { logout, login } from '../../store/slices/authSlice';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { fetchUserProfile } from '../../services/authService';
import { User } from '../../types/auth';

const Header: React.FC = () => {
  const { isAuthenticated, user, isAdmin } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    if (!isAuthenticated) setAnchorEl(null);
  }, [isAuthenticated]);

  useEffect(() => {
    if (!user && isAuthenticated) {
      fetchUserProfile()
        .then((user: User) => {
          dispatch(login(user));
        })
        .catch(() => {
          dispatch(logout());
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
    setAnchorEl(null);
    dispatch(logout());
    navigate('/login');
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#141414' }}>
      <Toolbar sx={{ px: '2rem', justifyContent: 'space-between', paddingTop: '1rem' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Button onClick={() => navigate('/')} sx={{ color: 'common.white', p: 0, fontSize: '1.1rem', fontWeight: 900, letterSpacing: 1.2 }}>STREAMLINE<span style={{ color: '#e50914' }}>.</span></Button>
        </Box>
        {isAuthenticated ? (
          <>
            <Stack direction="row" spacing={1} alignItems="center">
            {isAdmin && (
              <Button
                color="inherit"
                startIcon={<DashboardOutlinedIcon />}
                onClick={() => navigate('/dashboard')}
              >
                Dashboard
              </Button>
            )}
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
            </Stack>
          </>
        ) : (
          <Typography
            variant="body1"
            onClick={() => navigate('/login')}
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
