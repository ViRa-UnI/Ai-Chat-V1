import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Set the AUTH token for any request
api.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

export const register = (userData) => api.post('/auth/register', userData);
export const login = (credentials) => api.post('/auth/login', credentials);
export const fetchChatHistory = () => api.get('/chat/history');
export const sendMessage = (messageData) => api.post('/chat/message', messageData);
export const updateSettings = (settingsData) => api.put('/user/settings', settingsData);

export default api;