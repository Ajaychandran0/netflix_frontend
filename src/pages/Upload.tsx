import { Box, Button, Typography } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useNavigate } from 'react-router-dom';
import VideoUpload from './dashboard/VideoUpload';
import { useMyUploads } from '../hooks/useMyUploads';

export default function Upload() {
  const navigate = useNavigate();
  const { uploads, error, refresh } = useMyUploads();
  const activeUpload = uploads.find((upload) => upload.status !== 'COMPLETED');
  return <Box sx={{ maxWidth: 1000, mx: 'auto', px: { xs: 2, sm: 4 }, py: { xs: 3, sm: 5 } }}>
    <Button startIcon={<ArrowBackRoundedIcon />} onClick={() => navigate('/')}>Back to library</Button>
    <Typography variant="h3" fontWeight={800} mt={2}>Create a stream</Typography><Typography color="text.secondary" mt={1} mb={4}>Publish a source video to the processing pipeline.</Typography>
    <VideoUpload onUploaded={() => void refresh()} />
    {error && <Typography color="error" mt={3}>{error}</Typography>}
    {activeUpload && <Box mt={4} p={2.5} sx={{ border: 1, borderColor: 'divider', borderRadius: 3, bgcolor: 'background.paper' }}><Typography fontWeight={700}>Processing: {activeUpload.title}</Typography><Typography color="text.secondary" mt={0.5}>Status: {activeUpload.status.toLowerCase()}{activeUpload.current_stage ? ` · ${activeUpload.current_stage.replace(/_/g, ' ')}` : ''}. This view refreshes every five seconds.</Typography></Box>}
  </Box>;
}
