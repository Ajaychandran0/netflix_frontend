import React, { useState, useRef } from 'react';
import { Box, Typography, Button, TextField, Paper } from '@mui/material';

const VideoUpload: React.FC = () => {
  const [form, setForm] = useState<{ title: string; description: string; thumbnail: File | string; video: File | null }>({ title: '', description: '', thumbnail: '', video: null });
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'video' && files) {
      setForm((prev) => ({ ...prev, video: files[0] }));
    } else if (name === 'thumbnail' && files) {
      setForm((prev) => ({ ...prev, thumbnail: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.title || !form.description || !form.video) {
      setError('Please fill all required fields and select a video file.');
      return;
    }
    setUploading(true);
    // TODO: Replace with actual API call
    setTimeout(() => {
      setUploading(false);
      setForm({ title: '', description: '', thumbnail: '', video: null });
      setError('');
      alert('Video uploaded (mock)!');
    }, 1000);
  };

  return (
    <Paper sx={{ p: 3, backgroundColor: '#1e1e1e', color: 'white', maxWidth: 600 }}>
      <Typography variant="h6" gutterBottom>Upload Video</Typography>
      <Box component="form" onSubmit={handleUpload} mt={2}>
        <TextField
          label="Title"
          name="title"
          variant='filled'
          slotProps={{
            input: {
              sx: { color: 'white' }
            },
            inputLabel: {
              sx: { color: '#b3b3b3' }
            }
          }}
          value={form.title}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2, color: 'white' }}
        />

        <TextField
          variant='filled'
          slotProps={{
            input: {
              sx: { color: 'white' }
            },
            inputLabel: {
              sx: { color: '#b3b3b3' }
            }
          }}
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button variant="contained" component="label" sx={{ mb: 2 }}>
          Select Video
          <input type="file" name="video" accept="video/*" hidden onChange={handleChange} ref={fileInputRef} />
        </Button>
        {form.video && <Typography variant="body2">Selected: {form.video.name}</Typography>}
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary" disabled={uploading}>
            {uploading ? 'Uploading...' : 'Upload'}
          </Button>
        </Box>
        {error && <Typography color="error" mt={2}>{error}</Typography>}
      </Box>
    </Paper>
  );
};

export default VideoUpload;
