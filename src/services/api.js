import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor with retry logic
const MAX_RETRIES = 3;
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    
    // Skip retry for specific error responses
    if (response && (response.status === 401 || response.status === 403 || response.status === 404)) {
      return Promise.reject(error);
    }
    
    // Initialize retry count
    config.retryCount = config.retryCount || 0;
    
    // Check if we should retry the request
    const shouldRetry = (
      // Network errors or server errors (5xx)
      (!response || (response && response.status >= 500)) &&
      config.retryCount < MAX_RETRIES
    );
    
    if (shouldRetry) {
      config.retryCount += 1;
      console.log(`🔄 Retrying API request (${config.retryCount}/${MAX_RETRIES}): ${config.url}`);
      
      // Exponential backoff delay: 1s, 2s, 4s
      const delay = 1000 * Math.pow(2, config.retryCount - 1);
      
      // Wait for the delay
      await new Promise(resolve => setTimeout(resolve, delay));
      
      // Retry the request
      return apiClient(config);
    }
    
    return Promise.reject(error);
  }
);

// Helper function to handle API errors consistently
const handleApiError = (error) => {
  // Check for network errors
  if (!error.response) {
    console.error('Network error:', error.message);
    return {
      success: false,
      error: 'Connection error. Please check your internet connection and try again.',
      originalError: error.message
    };
  }
  
  // Check for server errors
  if (error.response.status >= 500) {
    console.error('Server error:', error.response.data);
    return {
      success: false,
      error: 'Server error. Please try again later.',
      originalError: error.response?.data?.message || error.message
    };
  }
  
  // Handle other errors
  return {
    success: false,
    error: error.response?.data?.message || error.message
  };
};

export const userAPI = {
  login: async (credentials) => {
    try {
      const response = await apiClient.post('/users/login', credentials);
      return { success: true, data: response.data };
    } catch (error) {
      return handleApiError(error);
    }
  },

  createUser: async (userData) => {
    try {
      const response = await apiClient.post('/users', userData);
      return { success: true, data: response.data };
    } catch (error) {
      return handleApiError(error);
    }
  },

  getAllUsers: async () => {
    try {
      const response = await apiClient.get('/users');
      return { success: true, data: response.data };
    } catch (error) {
      return handleApiError(error);
    }
  },

  getUserById: async (userId) => {
    try {
      const response = await apiClient.get(`/users/${userId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return handleApiError(error);
    }
  },

  updateUser: async (userId, userData) => {
    try {
      const response = await apiClient.put(`/users/${userId}`, userData);
      return { success: true, data: response.data };
    } catch (error) {
      return handleApiError(error);
    }
  },

  deleteUser: async (userId) => {
    try {
      const response = await apiClient.delete(`/users/${userId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return handleApiError(error);
    }
  }
};

export default apiClient;