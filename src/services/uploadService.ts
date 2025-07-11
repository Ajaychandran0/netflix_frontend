import axiosInstance from './axiosInstance';
import axios from 'axios';
import { UploadMetadata, UploadSession, CompletedPart } from '../types/upload';


export async function initiateUpload(meta: UploadMetadata): Promise<UploadSession> {
    try {

        const response = await axiosInstance.post('/api/content/initiate_upload', meta,
            {
                headers: { 'Content-Type': 'application/json' },
            });
        return response.data.data as UploadSession;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data.message;
        }
        throw new Error('An error occurred while initiating upload');
    }
}

export async function completeUpload(session: {
    video_id: string;
    upload_id: string;
    parts: CompletedPart[];
}): Promise<void> {
    try {
        await axiosInstance.post('/api/content/complete_upload', session, {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data.message;
        }
        throw new Error('An error occurred while completing upload');
    }
}