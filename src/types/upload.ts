export interface UploadSession {
upload_id: string;
video_id: string;
parts: { part_number: number; presigned_url: string }[];
}

export interface UploadMetadata {
title: string;
description: string;
filename: string;
filesize: number;
total_parts: number;
}

export interface CompletedPart {
etag: string;
part_number: number;
}