import { Button, Typography } from '@mui/material';

interface FileSelectorProps {
    name: string;
    label: string;
    accept: string;
    onChange: (file: File) => void;
    selectedFile: File | null;
}

const FileSelector: React.FC<FileSelectorProps> = ({ name, label, accept, onChange, selectedFile }) => {
    return (
        <>
            <Button variant="contained" component="label" sx={{ mb: 2 }}>
                {label}
                <input type="file" name={name} accept={accept} hidden onChange={(e) => {
                    if (e.target.files?.[0]) onChange(e.target.files[0]);
                }} />
            </Button>
            {selectedFile && <Typography variant="body2">Selected: {selectedFile.name}</Typography>}
        </>
    );
};

export default FileSelector;