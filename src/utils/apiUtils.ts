import axios from 'axios';

export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error) && error.response) {
    return error.response.data.message || 'An error occurred';
  }
  return 'An unexpected error occurred';
};