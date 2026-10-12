export type VideoStatus = 'UPLOADING' | 'QUEUED' | 'PROCESSING' | 'COMPLETED' | 'FAILED';

export interface VideoSummary {
  id: string;
  title: string;
  thumbnail_url: string | null;
  duration_ms: number | null;
  status: VideoStatus;
  created_at: string;
}

export interface UploadStatus extends VideoSummary {
  description: string | null;
  current_stage: string | null;
  last_error: string | null;
  progress?: number;
}

export interface VideoProgress {
  video_id: string;
  status: VideoStatus;
  stage: string | null;
  progress: number;
  thumbnail_url: string | null;
  updated_at: string | null;
}

export interface PaginatedVideos {
  items: VideoSummary[];
  total: number;
  page: number;
  page_size: number;
}

export interface PlaybackInfo {
  playback_url: string;
  expires_at: string;
}
