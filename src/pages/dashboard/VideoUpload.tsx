import { Box, Typography, Button, TextField, Paper, Alert, Stack } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useVideoUpload } from '../../hooks/useUpload';
import FileSelector from '../../components/upload/FileSelector';
import UploadProgress from '../../components/upload/UploadProgress';
import { CHUNK_SIZE } from '../../utils/chunkFile';

const SlotProps = {
  input: {
    sx: { color: 'white' }
  },
  inputLabel: {
    sx: { color: '#b3b3b3' }
  }
};

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  video: Yup.mixed().required('A video file is required'),
});

interface VideoUploadProps {
  onUploaded?: (videoId: string) => void;
}

const VideoUpload: React.FC<VideoUploadProps> = ({ onUploaded }) => {
  const { upload, uploading, progress, error, phase } = useVideoUpload();

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      video: null as File | null,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      if (!values.video) return;
      const meta = {
        title: values.title,
        description: values.description,
        filename: values.video.name,
        filesize: values.video.size,
        total_parts: Math.ceil(values.video.size / CHUNK_SIZE),
      };
      try {
        const videoId = await upload(meta, values.video);
        resetForm();
        if (videoId) onUploaded?.(videoId);
      } catch {
        // The hook provides the user-facing message so the form can stay intact for a retry.
      }
    },
  });

  return (
    <Paper elevation={0} sx={{ p: { xs: 2.5, sm: 4 }, bgcolor: 'background.paper', border: 1, borderColor: 'divider', borderRadius: 3, maxWidth: 760 }}>
      <Stack spacing={0.75}>
        <Typography variant="h5" fontWeight={700}>Publish a new video</Typography>
        <Typography variant="body2" color="text.secondary">Your browser uploads directly to object storage; the platform then creates adaptive HLS streams and thumbnails asynchronously.</Typography>
      </Stack>
      <Box component="form" mt={3} onSubmit={formik.handleSubmit}>
        <TextField
          label="Title"
          name="title"
          variant='filled'
          slotProps={SlotProps}
          value={formik.values.title}
          onChange={formik.handleChange}
          fullWidth
          required
          sx={{ mb: 2, color: 'white' }}
          error={Boolean(formik.errors.title && formik.touched.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
          variant='filled'
          slotProps={SlotProps}
          label="Description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
          error={Boolean(formik.errors.description && formik.touched.description)}
          helperText={formik.touched.description && formik.errors.description}
        />
        <Box display={'flex'} flexDirection='column' gap={2}>
          <FileSelector
            name="video"
            label="Select Video"
            accept="video/*"
            onChange={file => formik.setFieldValue('video', file)}
            selectedFile={formik.values.video}
            uploading={uploading}
            previewType="video"
          />

        </Box>
        <Box mt={2}>
          <Button
            type="submit"
            variant="contained"
            disabled={
              uploading ||
              !formik.values.video ||
              !formik.values.title ||
              !formik.values.description ||
              !formik.isValid ||
              !formik.dirty
            }
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </Button>
        </Box>
        {(uploading || phase === 'complete') && <UploadProgress value={progress} phase={phase} />}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </Box>
    </Paper>
  );
};

export default VideoUpload;


