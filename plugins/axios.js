import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
  const instance = axios.create({
    baseURL: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:3000', // Change this to your API URL
    withCredentials: true, // If you need to send cookies or auth tokens
  });

  // Optional: Add request interceptor
  instance.interceptors.request.use((config) => {
    console.log('Request:', config);
    return config;
  });

  // Optional: Add response interceptor
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error('API Error:', error.response?.data || error.message);
      return Promise.reject(error);
    }
  );

  // Make Axios globally available via `$axios`
  nuxtApp.provide('axios', instance);
});
