import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  Link,
} from '@mui/material';

import { signIn, fetchUserProfile } from '../services/authService';
import { login } from '../store/slices/authSlice';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (email: string, password: string) => {
    try {
      const { token } = await signIn(email, password);
      localStorage.setItem('token', token);
      const userProfile = await fetchUserProfile();
      dispatch(login(userProfile));
      navigate('/');
    } catch (error) {
      console.log('Login error:', error);
      setError(typeof error === 'string' ? error : 'An unexpected error occurred');
    }
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            backgroundColor: '#1e1e1e',
            width: '100%',
            maxWidth: 400,
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{ color: 'white', fontWeight: 'bold' }}
          >
            Sign In
          </Typography>

          <Stack spacing={2}>
            <TextField
              label="Email or phone number"
              variant="filled"
              fullWidth
              InputLabelProps={{ sx: { color: '#b3b3b3' } }}
              InputProps={{ sx: { color: 'white' } }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="filled"
              fullWidth
              InputLabelProps={{ sx: { color: '#b3b3b3' } }}
              InputProps={{ sx: { color: 'white' } }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => handleLogin(email, password)}
            >
              Sign In
            </Button>

            {error && (
              <Typography variant="body2" sx={{ color: 'red', mt: 2 }}>
                {error}
              </Typography>
            )}

            <Typography variant="body2" sx={{ color: 'gray', mt: 2 }}>
              New to Netflix?{' '}
              <Link href="/register" underline="hover" sx={{ color: 'white' }}>
                Sign up now
              </Link>
            </Typography>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

export default Login;
