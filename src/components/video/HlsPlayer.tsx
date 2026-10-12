import { Alert, Box, CircularProgress } from '@mui/material';
import Hls from 'hls.js';
import { useEffect, useRef, useState } from 'react';

interface HlsPlayerProps {
  source: string;
  title: string;
}

export default function HlsPlayer({ source, title }: HlsPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setError(null);
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = source;
      return;
    }

    if (!Hls.isSupported()) {
      setError('This browser does not support HLS playback.');
      return;
    }

    const hls = new Hls();
    hls.loadSource(source);
    hls.attachMedia(video);
    hls.on(Hls.Events.ERROR, (_, data) => {
      if (data.fatal) setError('The stream could not be loaded. Please try again.');
    });

    return () => hls.destroy();
  }, [source]);

  return (
    <Box sx={{ position: 'relative', bgcolor: 'black', borderRadius: 2, overflow: 'hidden' }}>
      <video ref={videoRef} controls autoPlay playsInline aria-label={title} style={{ display: 'block', width: '100%', maxHeight: '72vh' }} />
      {!error && !source && <CircularProgress sx={{ position: 'absolute', inset: 0, m: 'auto' }} />}
      {error && <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>}
    </Box>
  );
}
