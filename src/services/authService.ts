import axiosInstance from './axiosInstance';
import axios from 'axios';
import { SignUpForm, User } from '../types/auth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
let profileRequest: { token: string | null; promise: Promise<User> } | null = null;

export const signIn = async (email: string, password: string) => {
    try {
        const response = await axiosInstance.post('/api/auth/signin', { email, password });
        return response.data.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data.message;
        }
        throw new Error('An error occurred during sign-in');
    }
};

export const signUp = async ({ email, password }: SignUpForm) => {
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

export const fetchUserProfile = (): Promise<User> => {
    // Header and Profile can mount together (and StrictMode replays effects).
    // Share an in-flight request so those callers only hit the API once.
    const token = localStorage.getItem('token');
    if (!profileRequest || profileRequest.token !== token) {
        const request = axiosInstance.get('/api/users/profile')
            .then((response) => response.data.data as User).catch((error: unknown) => {
            if (axios.isAxiosError(error)) {
                if (error.response) throw error.response.data.message;
                throw new Error('Could not reach the profile service. Check your connection and try again.');
            }
            throw new Error('An error occurred while fetching the user profile');
        });
        const trackedRequest = request.finally(() => {
            if (profileRequest?.promise === trackedRequest) profileRequest = null;
        });
        profileRequest = { token, promise: trackedRequest };
    }
    return profileRequest.promise;
};
