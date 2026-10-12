import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Box, Button, Card, CardActionArea, CardContent, CardMedia, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, Paper, Skeleton, Stack, Typography } from '@mui/material';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import MovieFilterOutlinedIcon from '@mui/icons-material/MovieFilterOutlined';
import { useLocation, useNavigate } from 'react-router-dom';
import HlsPlayer from '../components/video/HlsPlayer';
import { useVideos } from '../hooks/useVideos';
import useAuth from '../hooks/useAuth';
import { getPlaybackInfo } from '../services/videoService';
import type { VideoSummary } from '../types/video';

const duration = (value: number | null) => !value ? 'Processing' : `${Math.floor(Math.round(value / 1000) / 60)}:${String(Math.round(value / 1000) % 60).padStart(2, '0')}`;
type HomeNavigationState = { playVideoId?: string };

function VideoCard({ video, onPlay }: { video: VideoSummary; onPlay: (video: VideoSummary) => void }) {
  return <Card sx={{ height: '100%', bgcolor: 'background.paper', border: 1, borderColor: 'divider', transition: 'transform .2s, border-color .2s', '&:hover': { transform: 'translateY(-4px)', borderColor: 'primary.main' } }}><CardActionArea onClick={() => onPlay(video)} sx={{ height: '100%', alignItems: 'stretch' }}>
    <Box sx={{ position: 'relative', aspectRatio: '16 / 9', bgcolor: 'grey.900', display: 'grid', placeItems: 'center' }}>
      {video.thumbnail_url ? <CardMedia component="img" image={video.thumbnail_url} alt={`Thumbnail for ${video.title}`} sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} /> : <MovieFilterOutlinedIcon color="disabled" sx={{ fontSize: 40 }} />}
      <IconButton aria-label={`Play ${video.title}`} sx={{ zIndex: 1, color: 'common.white', bgcolor: 'rgba(0,0,0,.58)', '&:hover': { bgcolor: 'primary.main' } }}><PlayArrowRoundedIcon /></IconButton><Chip label={duration(video.duration_ms)} size="small" sx={{ position: 'absolute', right: 8, bottom: 8, bgcolor: 'rgba(0,0,0,.75)', color: 'common.white' }} />
    </Box><CardContent sx={{ p: 1.75 }}><Typography fontWeight={700} noWrap>{video.title}</Typography><Typography variant="caption" color="text.secondary">Adaptive HLS playback</Typography></CardContent>
  </CardActionArea></Card>;
}

export default function Home() {
  const { videos, isLoading, error } = useVideos();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const requestedPlayVideoId = (location.state as HomeNavigationState | null)?.playVideoId;
  const [stream, setStream] = useState<{ url: string; title: string } | null>(null);
  const [isOpening, setIsOpening] = useState(false);
  const [playbackError, setPlaybackError] = useState<string | null>(null);
  const [loginPromptOpen, setLoginPromptOpen] = useState(false);
  const [loginPromptVideoId, setLoginPromptVideoId] = useState<string | null>(null);
  const autoPlayHandled = useRef<string | null>(null);
  const openVideo = useCallback(async (video: VideoSummary) => {
    if (!isAuthenticated) {
      setLoginPromptVideoId(video.id);
      setLoginPromptOpen(true);
      return;
    }
    setIsOpening(true);
    setPlaybackError(null);
    try {
      const playback = await getPlaybackInfo(video.id);
      setStream({ url: playback.playback_url, title: video.title });
    } catch (err) {
      setPlaybackError(err instanceof Error ? err.message : 'Unable to start playback.');
    } finally {
      setIsOpening(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!requestedPlayVideoId || !isAuthenticated || isLoading || autoPlayHandled.current === requestedPlayVideoId) return;
    autoPlayHandled.current = requestedPlayVideoId;
    const video = videos.find((item) => item.id === requestedPlayVideoId);
    if (video) {
      void openVideo(video);
    } else {
      setPlaybackError('That video is no longer available in the catalogue.');
    }
    navigate(location.pathname, { replace: true, state: null });
  }, [isAuthenticated, isLoading, location.pathname, navigate, openVideo, requestedPlayVideoId, videos]);
  const featured = videos[0];

  return <Box sx={{ px: { xs: 2, sm: 4, lg: 7 }, py: { xs: 3, sm: 5 }, maxWidth: 1600, mx: 'auto' }}>
    <Box sx={{ position: 'relative', overflow: 'hidden', border: 1, borderColor: 'divider', borderRadius: 4, p: { xs: 3, md: 6 }, minHeight: 300, background: 'radial-gradient(circle at 82% 12%, rgba(229,9,20,.34), transparent 30%), linear-gradient(135deg, #181818 0%, #0b0b0b 72%)' }}><Stack spacing={2.25} sx={{ maxWidth: 690 }}>
      <Chip label="VIDEO PLATFORM DEMO" color="primary" sx={{ alignSelf: 'flex-start', fontWeight: 700, letterSpacing: 1 }} /><Typography variant="h2" sx={{ fontSize: { xs: '2.4rem', md: '4rem' }, lineHeight: 1, fontWeight: 800 }}>Upload once.<br />Stream everywhere.</Typography><Typography color="text.secondary" sx={{ fontSize: '1.05rem', maxWidth: 560 }}>A backend-led video platform with direct multipart uploads, event-driven processing, adaptive HLS transcoding, and browser playback.</Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>{featured && <Button variant="contained" size="large" startIcon={<PlayArrowRoundedIcon />} onClick={() => void openVideo(featured)}>Watch latest</Button>}</Stack>
    </Stack></Box>
    {playbackError && <Alert severity="error" sx={{ mt: 3 }} onClose={() => setPlaybackError(null)}>{playbackError}</Alert>}
    <Divider sx={{ my: 5 }} /><Stack direction="row" justifyContent="space-between" alignItems="end" sx={{ mb: 2.25 }}><Box><Typography variant="h5" fontWeight={800}>Published videos</Typography><Typography variant="body2" color="text.secondary">Completed videos available for adaptive streaming.</Typography></Box><Typography variant="body2" color="text.secondary">{videos.length} videos</Typography></Stack>
    {error && <Alert severity="warning" sx={{ mb: 2 }}>{error}</Alert>}
    {isLoading ? <Grid container spacing={2}>{[1, 2, 3, 4].map((item) => <Grid key={item} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}><Skeleton variant="rounded" height={210} /></Grid>)}</Grid> : videos.length > 0 ? <Grid container spacing={2}>{videos.map((video) => <Grid key={video.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}><VideoCard video={video} onPlay={openVideo} /></Grid>)}</Grid> : <Paper variant="outlined" sx={{ p: 5, textAlign: 'center' }}><MovieFilterOutlinedIcon color="disabled" sx={{ fontSize: 42 }} /><Typography variant="h6" mt={1}>No published videos yet</Typography><Typography color="text.secondary" mt={1}>Check back soon for new releases.</Typography></Paper>}
    <Dialog open={loginPromptOpen} onClose={() => setLoginPromptOpen(false)}>
      <DialogTitle>Sign in to watch</DialogTitle>
      <DialogContent><Typography color="text.secondary">You can browse the library without an account. Sign in to start playback.</Typography></DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={() => setLoginPromptOpen(false)}>Maybe later</Button>
        <Button variant="contained" onClick={() => { setLoginPromptOpen(false); navigate('/login', { state: { returnTo: location.pathname, playVideoId: loginPromptVideoId } }); }}>Sign in</Button>
      </DialogActions>
    </Dialog>
    <Dialog open={Boolean(stream) || isOpening} onClose={() => { if (!isOpening) setStream(null); }} maxWidth="lg" fullWidth PaperProps={{ sx: { bgcolor: 'background.paper' } }}><DialogContent sx={{ p: { xs: 1, sm: 2 } }}>{isOpening ? <Box sx={{ display: 'grid', placeItems: 'center', minHeight: 300 }}><CircularProgress /></Box> : stream && <HlsPlayer source={stream.url} title={stream.title} />}</DialogContent></Dialog>
  </Box>;
}
