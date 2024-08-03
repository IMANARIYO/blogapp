import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:4444', // Your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      console.error('Unauthorized request');
      // Handle unauthorized access (e.g., redirect to login)
    }
    return Promise.reject(error);
  }
);
export const serverurl= 'http://localhost:4444'
export const apiMultipart = axios.create({
  baseURL: serverurl,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

apiMultipart.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

apiMultipart.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      console.error('Unauthorized request');
      // Handle unauthorized access (e.g., redirect to login)
    }
    return Promise.reject(error);
  }
);

export default api;
