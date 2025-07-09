import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Paper } from '@mui/material';
import { useVideoUpload } from '../../hooks/useUpload';
import FileSelector from '../../components/upload/FileSelector';
import UploadProgress from '../../components/upload/UploadProgress';
import { CHUNK_SIZE } from '../../utils/chunkFile';

const VideoUpload: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [video, setVideo] = useState<File | null>(null);
    const [thumbnail, setThumbnail] = useState<File | null>(null);

    const { upload, uploading, progress, error } = useVideoUpload();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !video) return;

        const meta = {
            title,
            description,
            filename: video.name,
            filesize: video.size,
            total_parts: Math.ceil(video.size / CHUNK_SIZE),
        };

        await upload(meta, video);
    }

    return (
        <Paper sx={{ p: 3, backgroundColor: '#1e1e1e', color: 'white', maxWidth: 600 }}>
            <Typography variant="h6">Upload Video</Typography>
            <Box component="form" mt={2} onSubmit={handleSubmit}>
                <TextField label="Title" value={title} fullWidth required onChange={(e) => setTitle(e.target.value)} variant="filled" sx={{ mb: 2 }} />
                <TextField label="Description" value={description} fullWidth onChange={(e) => setDescription(e.target.value)} variant="filled" sx={{ mb: 2 }} />

                <FileSelector name="video" label="Select Video" accept="video/*" onChange={setVideo} selectedFile={video} />
                <FileSelector name="thumbnail" label="Select Thumbnail (optional)" accept="image/*" onChange={setThumbnail} selectedFile={thumbnail} />

                <Box mt={2}>
                    <Button type="submit" variant="contained" disabled={uploading}>
                        {uploading ? 'Uploading...' : 'Upload'}
                    </Button>
                </Box>

                {uploading && <UploadProgress value={progress} />}
                {error && <Typography color="error" mt={2}>{error}</Typography>}
            </Box>
        </Paper>
    );
};

export default VideoUpload;




