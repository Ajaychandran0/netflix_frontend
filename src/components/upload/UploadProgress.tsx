import { LinearProgress, Typography, Box } from '@mui/material';

interface UploadProgressProps {
    value: number;
}

const UploadProgress: React.FC<UploadProgressProps> = ({ value }) => {
    return (
        <Box mt={2}>
            <Typography variant="body2">Uploading: {value}%</Typography>
            <LinearProgress variant="determinate" value={value} />
        </Box>
    );
};

export default UploadProgress;