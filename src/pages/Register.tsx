// src/pages/Register.tsx
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  Link,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/authSlice';
import { signUp } from '../services/authService';
import useAuth from '../hooks/useAuth';

const Register = () => {
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await signUp({ email: formData.email, password: formData.password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      dispatch(login(user));
      navigate('/');
    } catch (err) {
      setError(typeof err === 'string' ? err : 'An unexpected error occurred');
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
            Sign Up
          </Typography>

          <form onSubmit={handleRegister}>
            <Stack spacing={2}>
              <TextField
                label="Email"
                variant="filled"
                fullWidth
                InputLabelProps={{ sx: { color: '#b3b3b3' } }}
                InputProps={{ sx: { color: 'white' } }}
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <TextField
                label="Password"
                type="password"
                variant="filled"
                fullWidth
                InputLabelProps={{ sx: { color: '#b3b3b3' } }}
                InputProps={{ sx: { color: 'white' } }}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <TextField
                label="Confirm Password"
                type="password"
                variant="filled"
                fullWidth
                InputLabelProps={{ sx: { color: '#b3b3b3' } }}
                InputProps={{ sx: { color: 'white' } }}
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
              />
              <Button variant="contained" color="primary" fullWidth type="submit">
                Create Account
              </Button>

              {error && (
                <Typography variant="body2" sx={{ color: 'red', mt: 2 }}>
                  {error}
                </Typography>
              )}

              <Typography variant="body2" sx={{ color: 'gray', mt: 2 }}>
                Already have an account?{' '}
                <Link href="/login" underline="hover" sx={{ color: 'white' }}>
                  Sign in
                </Link>
              </Typography>
            </Stack>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default Register;
