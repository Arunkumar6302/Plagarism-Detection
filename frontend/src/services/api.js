import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Request interceptor to add token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const register = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/register`, { email, password });
  return response.data;
};

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  return response.data;
};

export const scanText = async (content) => {
  const response = await axios.post(`${API_URL}/detection/scan-text`, { content });
  return response.data;
};

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axios.post(`${API_URL}/detection/upload-file`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const getHistory = async () => {
  const response = await axios.get(`${API_URL}/detection/history`);
  return response.data;
};

export const deleteScan = async (id) => {
  const response = await axios.delete(`${API_URL}/detection/${id}`);
  return response.data;
};

export const clearAllHistory = async () => {
  const response = await axios.delete(`${API_URL}/detection/all`);
  return response.data;
};
