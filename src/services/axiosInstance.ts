import axios from 'axios';

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_BASE_URL = "http://localhost:3002"

const axiosInstance = axios.create({
  // baseURL: API_BASE_URL,
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
