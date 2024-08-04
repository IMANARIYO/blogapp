// services/userService.js

export const getUserFromLocalStorage = () => {
    const storedUser = localStorage.getItem('user');
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      return null;
    }
  };
  

  import api, { apiMultipart } from './api'; // Adjust the path as needed

// Get all users
export const getAllUsers = async () => {
  try {
    const response = await api.get('/auth/getAllUsers');
    console.log(response.data);
    return response.data;

  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Get user by ID
export const getUserById = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// Delete user by ID
export const deleteUserById = async (userId) => {
  try {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

// Update user profile
export const updateUserById = async (userId, userData, profilePicture) => {
  try {
    const formData = new FormData();
    formData.append('profilePicture', profilePicture);
    for (const key in userData) {
      if (userData.hasOwnProperty(key)) {
        formData.append(key, userData[key]);
      }
    }

    const response = await apiMultipart.put(`/users/${userId}`, formData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Add admin role
export const addAdmin = async (userId) => {
  try {
    const response = await api.post(`/users/${userId}/add-admin`);
    return response.data;
  } catch (error) {
    console.error('Error adding admin role:', error);
    throw error;
  }
};

// Remove admin role
export const removeAdmin = async (userId) => {
  try {
    const response = await api.post(`/users/${userId}/remove-admin`);
    return response.data;
  } catch (error) {
    console.error('Error removing admin role:', error);
    throw error;
  }
};

// Change password
export const changePassword = async (currentPassword, newPassword) => {
  try {
    const response = await api.post('/users/change-password', { currentPassword, newPassword });
    return response.data;
  } catch (error) {
    console.error('Error changing password:', error);
    throw error;
  }
};

// Generate and send OTP
export const generateAndSendOTP = async (email) => {
  try {
    const response = await api.post('/users/generate-otp', { email });
    return response.data;
  } catch (error) {
    console.error('Error generating OTP:', error);
    throw error;
  }
};

// Verify OTP and update password
export const verifyOTPAndUpdatePassword = async (email, otp, newPassword) => {
  try {
    const response = await api.post('/users/verify-otp', { email, otp, newPassword });
    return response.data;
  } catch (error) {
    console.error('Error verifying OTP and updating password:', error);
    throw error;
  }
};
