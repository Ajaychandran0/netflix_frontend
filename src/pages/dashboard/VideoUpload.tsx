import { Box, Typography, Button, TextField, Paper } from '@mui/material';
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
  thumbnail: Yup.mixed().notRequired(),
});

const VideoUpload: React.FC = () => {
  const { upload, uploading, progress, error } = useVideoUpload();

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      video: null as File | null,
      thumbnail: null as File | null,
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
      await upload(meta, values.video);
      resetForm();
    },
  });

  return (
    <Paper sx={{ p: 3, backgroundColor: '#1e1e1e', color: 'white', maxWidth: 600 }}>
      <Typography variant="h6">Upload Video</Typography>
      <Box component="form" mt={2} onSubmit={formik.handleSubmit}>
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

          <FileSelector
            name="thumbnail"
            label="Select Thumbnail (optional)"
            accept="image/*"
            onChange={file => formik.setFieldValue('thumbnail', file)}
            selectedFile={formik.values.thumbnail}
            uploading={uploading}
            previewType="image"
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
        {uploading && <UploadProgress value={progress} />}
        {error && <Typography color="error" mt={2}>{error}</Typography>}
      </Box>
    </Paper>
  );
};

export default VideoUpload;




