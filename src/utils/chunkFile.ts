export const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB

export function splitFileIntoChunks(file: File, chunkSize = CHUNK_SIZE): Blob[] {
    const chunks: Blob[] = [];
    let start = 0;
    while (start < file.size) {
        const end = Math.min(start + chunkSize, file.size);
        chunks.push(file.slice(start, end));
        start = end;
    }
    return chunks;
}