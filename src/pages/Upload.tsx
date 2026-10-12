import { Box, Button, Typography } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useNavigate } from 'react-router-dom';
import VideoUpload from './dashboard/VideoUpload';

export default function Upload() {
  const navigate = useNavigate();
  return <Box sx={{ maxWidth: 1000, mx: 'auto', px: { xs: 2, sm: 4 }, py: { xs: 3, sm: 5 } }}>
    <Button startIcon={<ArrowBackRoundedIcon />} onClick={() => navigate('/dashboard')}>Back to dashboard</Button>
    <Typography variant="h3" fontWeight={800} mt={2}>Create a stream</Typography><Typography color="text.secondary" mt={1} mb={4}>Publish a source video to the processing pipeline.</Typography>
    <VideoUpload />
  </Box>;
}
