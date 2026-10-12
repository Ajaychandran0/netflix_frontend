import axios from 'axios';
import axiosInstance from './axiosInstance';
import type { PaginatedVideos, PlaybackInfo, UploadStatus, VideoProgress } from '../types/video';

function messageFor(error: unknown, fallback: string): Error {
  if (axios.isAxiosError(error) && error.response?.data?.message) {
    return new Error(error.response.data.message);
  }
  return new Error(fallback);
}

export async function listVideos(search?: string): Promise<PaginatedVideos> {
  try {
    const response = await axiosInstance.get('/api/content/videos', {
      params: { page: 1, page_size: 24, ...(search ? { search } : {}) },
    });
    return response.data.data as PaginatedVideos;
  } catch (error) {
    throw messageFor(error, 'Unable to load the video library.');
  }
}

export async function listMyUploads(): Promise<UploadStatus[]> {
  try {
    const response = await axiosInstance.get('/api/content/videos/mine');
    return response.data.data as UploadStatus[];
  } catch (error) {
    throw messageFor(error, 'Unable to load your upload status.');
  }
}

export async function getVideoProgress(videoId: string): Promise<VideoProgress> {
  try {
    const response = await axiosInstance.get(`/api/content/videos/${videoId}/progress`);
    return response.data.data as VideoProgress;
  } catch (error) {
    throw messageFor(error, 'Unable to load video processing progress.');
  }
}

export async function updateVideo(videoId: string, payload: { title: string; description: string }): Promise<UploadStatus> {
  try {
    const response = await axiosInstance.put(`/api/content/videos/${videoId}`, payload);
    return response.data.data as UploadStatus;
  } catch (error) {
    throw messageFor(error, 'Unable to update this video.');
  }
}

export async function deleteVideo(videoId: string): Promise<void> {
  try {
    await axiosInstance.delete(`/api/content/videos/${videoId}`);
  } catch (error) {
    throw messageFor(error, 'Unable to delete this video.');
  }
}

export async function getPlaybackInfo(videoId: string): Promise<PlaybackInfo> {
  try {
    const response = await axiosInstance.get(`/api/content/videos/${videoId}/playback`);
    return response.data.data as PlaybackInfo;
  } catch (error) {
    throw messageFor(error, 'Unable to start playback.');
  }
}
