import { LinearProgress, Typography, Box } from '@mui/material';

interface UploadProgressProps {
    value: number;
    phase?: 'idle' | 'preparing' | 'uploading' | 'finalizing' | 'complete';
}

const labels = {
    idle: 'Ready to upload',
    preparing: 'Preparing a multipart upload',
    uploading: 'Uploading source video',
    finalizing: 'Finalizing upload and queuing the transcoder',
    complete: 'Upload queued for processing',
};

const UploadProgress: React.FC<UploadProgressProps> = ({ value, phase = 'uploading' }) => {
    return (
        <Box mt={3} aria-live="polite">
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>{labels[phase]}</Typography>
            <LinearProgress variant={phase === 'finalizing' ? 'indeterminate' : 'determinate'} value={value} />
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.75 }}>
                {phase === 'uploading' ? `${value}% of file parts uploaded` : 'Processing status will appear in My uploads.'}
            </Typography>
        </Box>
    );
};

export default UploadProgress;
