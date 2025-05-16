import { Box, Typography, Paper, Stack, Button, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { User } from '../types/auth';
import { updateUserProfile, fetchUserProfile } from '../services/authService';
import { handleApiError } from '../utils/apiUtils';
import { login } from '../store/slices/authSlice';
import useAuth from '../hooks/useAuth';

interface UserProfileProps {}

const UserProfile: React.FC<UserProfileProps> = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<User | null>(null);

  useEffect(() => {
    if (!user) {
      fetchUserProfile()
        .then((userData) => {
          dispatch(login(userData));
          setFormData(userData);
        })
        .catch((error) => {
          console.error('Failed to fetch user profile:', error);
        });
    } else {
      setFormData(user);
    }
  }, [user, dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = async () => {
    if (formData) {
      try {
        await updateUserProfile(formData);
        alert('Profile updated successfully');
        setEditMode(false);
      } catch (error) {
        alert(handleApiError(error));
      }
    }
  };

  if (!formData) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box >
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
            User Profile
          </Typography>

          <Stack spacing={2} sx={{ color: 'white' }}>
            {editMode ? (
              <>
                <TextField
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  fullWidth
                  InputLabelProps={{ style: { color: '#b3b3b3' } }}
                  InputProps={{
                    style: { color: 'white', backgroundColor: '#1e1e1e', border: '1px solid #E50914' },
                  }}
                />
                <TextField
                  label="Phone"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleInputChange}
                  fullWidth
                  InputLabelProps={{ style: { color: '#b3b3b3' } }}
                  InputProps={{
                    style: { color: 'white', backgroundColor: '#1e1e1e', border: '1px solid #E50914' },
                  }}
                />
                <TextField
                  label="First Name"
                  name="firstName"
                  value={formData.firstName || ''}
                  onChange={handleInputChange}
                  fullWidth
                  InputLabelProps={{ style: { color: '#b3b3b3' } }}
                  InputProps={{
                    style: { color: 'white', backgroundColor: '#1e1e1e', border: '1px solid #E50914' },
                  }}
                />
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName || ''}
                  onChange={handleInputChange}
                  fullWidth
                  InputLabelProps={{ style: { color: '#b3b3b3' } }}
                  InputProps={{
                    style: { color: 'white', backgroundColor: '#1e1e1e', border: '1px solid #E50914' },
                  }}
                />
                <Button variant="contained" color="primary" onClick={handleSave}>
                  Save
                </Button>
              </>
            ) : (
              <>
                <Typography>Email: {formData.email}</Typography>
                <Typography>Phone: {formData.phone || 'N/A'}</Typography>
                <Typography>First Name: {formData.firstName || 'N/A'}</Typography>
                <Typography>Last Name: {formData.lastName || 'N/A'}</Typography>
                <Button variant="contained" color="primary" onClick={() => setEditMode(true)}>
                  Edit
                </Button>
              </>
            )}
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

export default UserProfile;
