// services/userService.js

export const getUserFromLocalStorage = () => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  };
  getUserFromLocalStorage();