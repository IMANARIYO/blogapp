import axios from "axios";

// Your API base URL
const originalServerUrl = 'http://localhost:4444';
let serverurl = originalServerUrl; // Initially set to originalServerUrl

// Function to check if the server is running
const checkServerStatus = async () => {
  try {
    await axios.get(`${originalServerUrl}/health-check`); // Adjust endpoint as necessary
    console.log('Server is running');
    return true;
  } catch (error) {
    console.error('Server is not available', error);
    return false;
  }
};

// Check server status and update serverurl
const updateServerUrl = async () => {
  const serverIsRunning = await checkServerStatus();
  if (!serverIsRunning) {
    serverurl = '';
  }
};

// Immediately update serverurl on module load
await updateServerUrl(); // Ensure it runs and completes

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
export { serverurl };
export default api;
