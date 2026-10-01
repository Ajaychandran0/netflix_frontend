import { useCallback, useEffect, useRef, useState } from 'react';
import { listMyUploads } from '../services/videoService';
import type { UploadStatus } from '../types/video';

const ACTIVE_STATUSES = new Set(['UPLOADING', 'QUEUED', 'PROCESSING']);

export function useMyUploads({ poll = true }: { poll?: boolean } = {}) {
  const [uploads, setUploads] = useState<UploadStatus[]>([]);
  const [error, setError] = useState<string | null>(null);
  const initialLoadStarted = useRef(false);

  const refresh = useCallback(async () => {
    try {
      setError(null);
      setUploads(await listMyUploads());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load upload status.');
    }
  }, []);

  useEffect(() => {
    // React StrictMode replays effects in development. Keep the initial request
    // to one call per mounted page while still allowing explicit refreshes.
    if (initialLoadStarted.current) return;
    initialLoadStarted.current = true;
    void refresh();
  }, [refresh]);
  useEffect(() => {
    if (!poll) return;
    if (!uploads.some((upload) => ACTIVE_STATUSES.has(upload.status))) return;
    const timer = window.setInterval(() => void refresh(), 5000);
    return () => window.clearInterval(timer);
  }, [uploads, poll, refresh]);

  return { uploads, error, refresh };
}
