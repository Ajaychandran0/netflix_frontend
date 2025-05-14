import axiosInstance from './axiosInstance';
import axios from 'axios';
import { User } from '../types/auth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const signIn = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post('/api/auth/signin', { email, password });
    console.log('Sign-in response:', response.data);
    return response.data.data; 
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data.message;
    }
    throw new Error('An error occurred during sign-in');
  }
};

export const signUp = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post(`${API_BASE_URL}/api/auth/register`, { email, password });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data.message;
    }
    throw 'An error occurred during sign-up';
  }
};

export const updateUserProfile = async (user: {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.put('/api/users/profile', user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data.message;
    }
    throw 'An error occurred while updating the profile';
  }
};

export const fetchUserProfile = async (): Promise<User> => {
  try {
    const response = await axiosInstance.get('/api/users/profile');
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data.message;
    }
    throw new Error('An error occurred while fetching the user profile');
  }
};
