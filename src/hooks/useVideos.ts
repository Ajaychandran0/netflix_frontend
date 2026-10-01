import { useCallback, useEffect, useState } from 'react';
import { listVideos } from '../services/videoService';
import type { VideoSummary } from '../types/video';

export function useVideos() {
  const [videos, setVideos] = useState<VideoSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setError(null);
      const library = await listVideos();
      setVideos(library.items);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load your videos.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { videos, isLoading, error, refresh };
}
