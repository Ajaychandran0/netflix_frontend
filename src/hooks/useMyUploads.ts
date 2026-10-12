import { useCallback, useEffect, useRef, useState } from 'react';
import { getVideoProgress, listMyUploads } from '../services/videoService';
import type { UploadStatus } from '../types/video';

const POLL_STATUSES = new Set(['QUEUED', 'PROCESSING']);

export function useMyUploads() {
  const [uploads, setUploads] = useState<UploadStatus[]>([]);
  const [error, setError] = useState<string | null>(null);
  const uploadsRef = useRef<UploadStatus[]>([]);
  const initialLoadStarted = useRef(false);
  const refreshInProgress = useRef(false);

  const updateUploads = useCallback((updater: (current: UploadStatus[]) => UploadStatus[]) => {
    setUploads((current) => {
      const next = updater(current);
      uploadsRef.current = next;
      return next;
    });
  }, []);

  const updateUpload = useCallback((videoId: string, patch: Partial<UploadStatus>) => {
    updateUploads((current) => current.map((upload) => (
      upload.id === videoId ? { ...upload, ...patch } : upload
    )));
  }, [updateUploads]);

  const removeUpload = useCallback((videoId: string) => {
    updateUploads((current) => current.filter((upload) => upload.id !== videoId));
  }, [updateUploads]);

  const refreshProgress = useCallback(async () => {
    if (refreshInProgress.current) return;
    const pending = uploadsRef.current.filter((upload) => POLL_STATUSES.has(upload.status));
    if (pending.length === 0) return;

    refreshInProgress.current = true;
    const results = await Promise.all(pending.map(async (upload) => {
      try {
        return { videoId: upload.id, progress: await getVideoProgress(upload.id) };
      } catch {
        return { videoId: upload.id, progress: null };
      }
    }));

    let progressUnavailable = false;
    updateUploads((current) => current.map((upload) => {
      const result = results.find(({ videoId }) => videoId === upload.id);
      if (!result) return upload;
      if (!result.progress) {
        progressUnavailable = true;
        return upload;
      }
      return {
        ...upload,
        status: result.progress.status,
        current_stage: result.progress.stage ?? upload.current_stage,
        progress: result.progress.progress,
        thumbnail_url: result.progress.thumbnail_url ?? upload.thumbnail_url,
      };
    }));
    setError(progressUnavailable ? 'Live processing progress is temporarily unavailable.' : null);
    refreshInProgress.current = false;
  }, [updateUploads]);

  useEffect(() => {
    if (initialLoadStarted.current) return;
    initialLoadStarted.current = true;
    void listMyUploads()
      .then((items) => {
        const normalized = items.map((upload) => ({
          ...upload,
          progress: upload.status === 'COMPLETED' ? 100 : 0,
        }));
        updateUploads(() => normalized);
        setError(null);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Unable to load your videos.');
      });
  }, [updateUploads]);

  const pendingIds = uploads
    .filter((upload) => POLL_STATUSES.has(upload.status))
    .map((upload) => upload.id)
    .join(',');

  useEffect(() => {
    if (!pendingIds) return;
    void refreshProgress();
    const timer = window.setInterval(() => void refreshProgress(), 5000);
    return () => window.clearInterval(timer);
  }, [pendingIds, refreshProgress]);

  return { uploads, error, updateUpload, removeUpload };
}
