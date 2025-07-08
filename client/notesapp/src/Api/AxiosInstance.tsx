import axios from 'axios';
const baseURL = import.meta.env.VITE_API_URL;


const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('NotesToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token.replace(/"/g, '')}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Unauthorized! Logging out...');
      localStorage.removeItem('token'); 
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
