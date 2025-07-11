import { Button, Typography, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { useMemo } from 'react';

interface FileSelectorProps {
    name: string;
    label: string;
    accept: string;
    onChange: (file: File | null) => void;
    selectedFile: File | null;
    uploading?: boolean;
    previewType?: 'video' | 'image';
}

const FileSelector: React.FC<FileSelectorProps> = ({ name, label, accept, onChange, selectedFile, uploading = false, previewType }) => {
    // Memoize preview URL
    const previewUrl = useMemo(() => {
        if (selectedFile) {
            return URL.createObjectURL(selectedFile);
        }
        return null;
    }, [selectedFile]);

    return (
        <Box>
            {!selectedFile && (
                <Button variant="contained" component="label" sx={{ mb: 2 }}>
                    {label}
                    <input type="file" name={name} accept={accept} hidden onChange={(e) => {
                        if (e.target.files?.[0]) onChange(e.target.files[0]);
                    }} />
                </Button>
            )}
            {selectedFile && (
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <Typography variant="body2">{selectedFile.name}</Typography>
                    <IconButton
                        size="small"
                        onClick={() => onChange(null)}
                        disabled={uploading}
                        sx={{ color: 'white', p: 0.5 }}
                        aria-label={`Remove ${name}`}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Box>
            )}
            {selectedFile && previewType === 'video' && previewUrl && (
                <Box mb={1}>
                    <video
                        src={previewUrl}
                        controls
                        muted
                        style={{ maxWidth: '100%', maxHeight: 200, background: '#000' }}
                    />
                </Box>
            )}
            {selectedFile && previewType === 'image' && previewUrl && (
                <Box mb={1}>
                    <img
                        src={previewUrl}
                        alt={selectedFile.name}
                        style={{ maxWidth: '100%', maxHeight: 200, background: '#000' }}
                    />
                </Box>
            )}
        </Box>
    );
};

export default FileSelector;