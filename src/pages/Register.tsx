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
import { signUp } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const data = await signUp(email, password);
      console.log('Sign-up successful:', data);
      navigate('/'); // Redirect to home page
    } catch (err) {
      setError(typeof err === 'string' ? err : 'An unexpected error occurred');
    }
  };

  return (
    <Box sx={{ backgroundColor: '#141414', width: '100vw', minHeight: '100vh' }}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
        width={"100vw"}
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

          <Stack spacing={2}>
            <TextField
              label="Email"
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
            <TextField
              label="Confirm Password"
              type="password"
              variant="filled"
              fullWidth
              InputLabelProps={{ sx: { color: '#b3b3b3' } }}
              InputProps={{ sx: { color: 'white' } }}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button variant="contained" color="primary" fullWidth onClick={handleSignUp}>
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
        </Paper>
      </Box>
    </Box>
  );
};

export default Register;
