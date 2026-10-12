import { useState } from 'react';
import { UploadMetadata, CompletedPart } from '../types/upload';
import { initiateUpload, completeUpload } from '../services/uploadService';
import { splitFileIntoChunks } from '../utils/chunkFile';

export function useVideoUpload() {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [phase, setPhase] = useState<'idle' | 'preparing' | 'uploading' | 'finalizing' | 'complete'>('idle');

    const upload = async (meta: UploadMetadata, file: File) => {
        setError(null);
        setUploading(true);
        setProgress(0);
        setPhase('preparing');

        try {
            const session = await initiateUpload(meta);
            const chunks = splitFileIntoChunks(file);
            const etags: CompletedPart[] = [];

            setPhase('uploading');

            for (const part of session.parts) {
                const chunk = chunks[part.part_number - 1];

                const res = await fetch(part.presigned_url, {
                    method: 'PUT',
                    body: chunk,
                });

                if (!res.ok) throw new Error(`Upload failed for part ${part.part_number}`);
                const etag = res.headers.get('ETag')?.replace(/"/g, '');
                if (etag) {
                    etags.push({ part_number: part.part_number, etag: etag });
                }

                const pct = Math.round((etags.length / session.parts.length) * 100);
                setProgress(pct);
            }

            setPhase('finalizing');
            await completeUpload({ video_id: session.video_id, upload_id: session.upload_id, parts: etags });
            setPhase('complete');
            return session.video_id;
        } catch (err) {
            setError((err as Error).message);
            setPhase('idle');
            throw err;
        } finally {
            setUploading(false);
        }

    };

    return { upload, uploading, progress, error, phase };
}
