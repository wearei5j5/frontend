import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log('req config', config);
    return config;
  },
  (error) => {
    console.log('req error', error);
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log('res', response);
    return response;
  },
  (error) => {
    console.log('res error', error);
    return Promise.reject(error);
  },
);

export default axiosInstance;
