import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.access) {
    config.headers.Authorization = `Bearer ${session.access}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Since we are rotating tokens on the server (in auth.ts jwt callback),
      // calling getSession() should return a fresh access token if the previous one expired.
      const session = await getSession();

      if (session?.access) {
        originalRequest.headers.Authorization = `Bearer ${session.access}`;
        return api(originalRequest);
      }
      
      // If we still don't have a valid token, sign out
      await signOut();
    }
    return Promise.reject(error);
  }
);

export default api;
