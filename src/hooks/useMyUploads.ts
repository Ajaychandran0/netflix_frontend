import { useCallback, useEffect, useState } from 'react';
import { listMyUploads } from '../services/videoService';
import type { UploadStatus } from '../types/video';

const ACTIVE_STATUSES = new Set(['UPLOADING', 'QUEUED', 'PROCESSING']);

export function useMyUploads() {
  const [uploads, setUploads] = useState<UploadStatus[]>([]);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setError(null);
      setUploads(await listMyUploads());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load upload status.');
    }
  }, []);

  useEffect(() => { void refresh(); }, [refresh]);
  useEffect(() => {
    if (!uploads.some((upload) => ACTIVE_STATUSES.has(upload.status))) return;
    const timer = window.setInterval(() => void refresh(), 5000);
    return () => window.clearInterval(timer);
  }, [uploads, refresh]);

  return { uploads, error, refresh };
}
