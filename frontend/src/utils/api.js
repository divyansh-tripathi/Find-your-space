import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
});

// Add a request interceptor to handle credentials if needed
api.defaults.withCredentials = true;

export default api;
