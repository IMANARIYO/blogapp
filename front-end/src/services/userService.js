import api, { apiMultipart } from './api'

// services/userService.js

export const getUserFromLocalStorage = () => {
  const storedUser = localStorage.getItem('user')
  try {
    return storedUser ? JSON.parse(storedUser) : null
  } catch (error) {
    console.error('Error parsing user from localStorage:', error)
    return null
  }
}

// Get all users
export const getAllUsers = async () => {
  try {
    const response = await api.get('/auth/getAllUsers')
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}
export const getUser = () => {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

export const getUserRole = () => {
  const user = getUser()
  return user ? user.role : null // Assuming the user object has a 'role' property
}

export const getUserId = () => {
  const user = getUser()
  return user ? user.id : null // Assuming the user object has an 'id' property
}

// Get user by ID
export const getUserById = async userId => {
  try {
    const response = await api.get(`/users/${userId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching user:', error)
  }
}

// Delete user by ID
export const deleteUserById = async userId => {
  try {
    const response = await api.delete(`/users/${userId}`)
    return response.data
  } catch (error) {
    console.error('Error deleting user:', error)
  }
}

// Update user profile
export const updateUserById = async (userId, userData, profilePicture) => {
  try {
    const formData = new FormData()
    formData.append('profilePicture', profilePicture)
    for (const key in userData) {
      if (userData.hasOwnProperty(key)) {
        formData.append(key, userData[key])
      }
    }

    const response = await apiMultipart.put(`/users/${userId}`, formData)
    return response.data
  } catch (error) {
    console.error('Error updating user:', error)
  }
}

// Add admin role
export const addAdmin = async userId => {
  try {
    const response = await api.patch(`auth/addadminbyid/${userId}`)
    return response.data
  } catch (error) {
    console.error('Error adding admin role:', error)
  }
}

// Remove admin role
export const removeAdmin = async userId => {
  try {
    const response = await api.patch(`/auth/maketheadminasuser/${userId}`)
    return response.data
  } catch (error) {
    console.error('Error removing admin role:', error)
  }
}

// Change password
export const changePassword = async (currentPassword, newPassword) => {
  try {
    const response = await api.post('/users/change-password', {
      currentPassword,
      newPassword
    })
    return response.data
  } catch (error) {
    console.error('Error changing password:', error)
  }
}

// Generate and send OTP
export const generateAndSendOTP = async email => {
  try {
    const response = await api.post('/users/generate-otp', { email })
    return response.data
  } catch (error) {
    console.error('Error generating OTP:', error)
  }
}

// Verify OTP and update password
export const verifyOTPAndUpdatePassword = async (email, otp, newPassword) => {
  try {
    const response = await api.post('/users/verify-otp', {
      email,
      otp,
      newPassword
    })
    return response.data
  } catch (error) {
    console.error('Error verifying OTP and updating password:', error)
  }
}
