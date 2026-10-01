import { useMemo, useState } from 'react';
import { Alert, Box, Button, Chip, Container, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { useNavigate } from 'react-router-dom';
import { useMyUploads } from '../hooks/useMyUploads';
import type { VideoStatus } from '../types/video';

const statusColor: Record<VideoStatus, 'default' | 'info' | 'warning' | 'success' | 'error'> = {
  UPLOADING: 'info', QUEUED: 'warning', PROCESSING: 'warning', COMPLETED: 'success', FAILED: 'error',
};
const demoViews = [1240, 876, 642, 510, 388, 264];

function formatDate(value: string) {
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date(value));
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { uploads, error } = useMyUploads();
  const [search, setSearch] = useState('');
  const filteredUploads = useMemo(
    () => uploads.filter((video) => video.title.toLowerCase().includes(search.trim().toLowerCase())),
    [uploads, search],
  );
  const published = uploads.filter((video) => video.status === 'COMPLETED').length;
  const processing = uploads.filter((video) => ['UPLOADING', 'QUEUED', 'PROCESSING'].includes(video.status)).length;
  const failed = uploads.filter((video) => video.status === 'FAILED').length;
  const views = uploads.filter((video) => video.status === 'COMPLETED').reduce((total, _video, index) => total + demoViews[index % demoViews.length], 0);
  const stats = [
    { label: 'Published videos', value: published, note: 'Your completed uploads', icon: <MovieOutlinedIcon />, color: '#f24752' },
    { label: 'Total views', value: views.toLocaleString(), note: 'Demo analytics', icon: <VisibilityOutlinedIcon />, color: '#8c7bff' },
    { label: 'Processing', value: processing, note: 'Live upload status', icon: <ScheduleOutlinedIcon />, color: '#ffb547' },
    { label: 'Needs attention', value: failed, note: 'Failed uploads', icon: <ErrorOutlineRoundedIcon />, color: '#53c7b5' },
  ];

  return (
    <Box sx={{ minHeight: 'calc(100vh - 64px)', bgcolor: '#0d0d10', py: { xs: 3, md: 5 } }}>
      <Container maxWidth="xl">
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'center' }} spacing={2} mb={4}>
          <Box>
            <Typography variant="overline" sx={{ color: 'primary.main', letterSpacing: 2 }}>CREATOR STUDIO</Typography>
            <Typography variant="h3" fontWeight={800} sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>Admin dashboard</Typography>
            <Typography color="text.secondary" mt={0.75}>Manage your uploads and keep an eye on your channel.</Typography>
          </Box>
          <Button variant="contained" size="large" startIcon={<AddRoundedIcon />} onClick={() => navigate('/upload')} sx={{ alignSelf: { xs: 'stretch', sm: 'auto' }, borderRadius: 2, px: 2.5, py: 1.25 }}>
            Upload video
          </Button>
        </Stack>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', lg: 'repeat(4, 1fr)' }, gap: 2, mb: 3 }}>
          {stats.map((stat) => <Paper key={stat.label} elevation={0} sx={{ p: { xs: 2, md: 2.5 }, border: 1, borderColor: 'rgba(255,255,255,.08)', borderRadius: 3, bgcolor: '#17171b' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box><Typography variant="body2" color="text.secondary">{stat.label}</Typography><Typography variant="h4" fontWeight={750} mt={1}>{stat.value}</Typography><Typography variant="caption" color="text.secondary">{stat.note}</Typography></Box>
              <Box sx={{ display: 'grid', placeItems: 'center', width: 40, height: 40, borderRadius: 2, bgcolor: `${stat.color}1c`, color: stat.color }}>{stat.icon}</Box>
            </Stack>
          </Paper>)}
        </Box>

        <Alert severity="info" icon={false} sx={{ mb: 3, bgcolor: 'rgba(140,123,255,.09)', color: '#c9c2ff', border: '1px solid rgba(140,123,255,.18)' }}>
          Total views are sample dashboard data for the MVP. Live analytics will appear when the backend provides them.
        </Alert>
        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        <Paper elevation={0} sx={{ border: 1, borderColor: 'rgba(255,255,255,.08)', borderRadius: 3, overflow: 'hidden', bgcolor: '#17171b' }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ sm: 'center' }} justifyContent="space-between" spacing={2} sx={{ p: { xs: 2, md: 2.5 } }}>
            <Box><Typography variant="h6" fontWeight={700}>Your videos</Typography><Typography variant="body2" color="text.secondary">Uploads and processing status from your account.</Typography></Box>
            <TextField size="small" placeholder="Search your videos" value={search} onChange={(event) => setSearch(event.target.value)} InputProps={{ startAdornment: <SearchRoundedIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} /> }} sx={{ width: { xs: '100%', sm: 260 }, '& .MuiOutlinedInput-root': { bgcolor: '#101014' } }} />
          </Stack>
          {filteredUploads.length === 0 ? <Box sx={{ p: 6, textAlign: 'center', borderTop: 1, borderColor: 'divider' }}>
            <MovieOutlinedIcon sx={{ color: 'text.secondary', fontSize: 38, mb: 1 }} />
            <Typography fontWeight={650}>{search ? 'No matching videos' : 'Your library is ready for its first upload'}</Typography>
            <Typography variant="body2" color="text.secondary" mt={0.75}>{search ? 'Try another title.' : 'Upload a video and track its processing here.'}</Typography>
          </Box> : <TableContainer>
            <Table>
              <TableHead><TableRow sx={{ '& th': { color: 'text.secondary', borderColor: 'rgba(255,255,255,.08)', fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.7 } }}>
                <TableCell>Video</TableCell><TableCell>Status</TableCell><TableCell>Uploaded</TableCell><TableCell align="right">Views</TableCell><TableCell align="right">Actions</TableCell>
              </TableRow></TableHead>
              <TableBody>{filteredUploads.map((video, index) => <TableRow key={video.id} hover sx={{ '& td': { borderColor: 'rgba(255,255,255,.07)' } }}>
                <TableCell><Stack direction="row" spacing={1.5} alignItems="center"><Box component="img" src={video.thumbnail_url || undefined} alt="" sx={{ width: 88, height: 52, borderRadius: 1.5, objectFit: 'cover', bgcolor: '#25252b' }} /><Box><Typography fontWeight={650}>{video.title}</Typography>{video.current_stage && <Typography variant="caption" color="text.secondary">{video.current_stage.replace(/_/g, ' ')}</Typography>}{video.last_error && <Typography variant="caption" color="error.main" display="block">{video.last_error}</Typography>}</Box></Stack></TableCell>
                <TableCell><Chip size="small" label={video.status.toLowerCase()} color={statusColor[video.status]} sx={{ textTransform: 'capitalize' }} /></TableCell>
                <TableCell sx={{ color: 'text.secondary' }}>{formatDate(video.created_at)}</TableCell>
                <TableCell align="right" sx={{ color: 'text.secondary' }}>{video.status === 'COMPLETED' ? demoViews[index % demoViews.length].toLocaleString() : '—'}</TableCell>
                <TableCell align="right"><Stack direction="row" justifyContent="flex-end" spacing={0.5}><Button size="small" disabled title="Video editing API is not available yet" startIcon={<EditOutlinedIcon fontSize="small" />}>Edit</Button><Button size="small" color="error" disabled title="Video deletion API is not available yet" startIcon={<DeleteOutlineRoundedIcon fontSize="small" />}>Delete</Button></Stack></TableCell>
              </TableRow>)}</TableBody>
            </Table>
          </TableContainer>}
        </Paper>
        <Typography variant="caption" color="text.secondary" display="block" textAlign="right" mt={1.5}>Edit and delete will be enabled when owner scoped API operations are available.</Typography>
      </Container>
    </Box>
  );
}
