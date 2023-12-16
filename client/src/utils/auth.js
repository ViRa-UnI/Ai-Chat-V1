import axios from 'axios';
import jwt_decode from 'jwt-decode';

const API_URL = '/api/auth/';

// Function to register user
export const register = async (userData) => {
  try {
    const response = await axios.post(API_URL + 'register', userData);
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.error('Error registering new user:', error);
    throw error;
  }
};

// Function to login user
export const login = async (userData) => {
  try {
    const response = await axios.post(API_URL + 'login', userData);
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};

// Function to logout user
export const logout = () => {
  localStorage.removeItem('user');
};

// Function to get current user
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    const user = JSON.parse(userStr);
    const decodedToken = jwt_decode(user.token);
    if (decodedToken.exp * 1000 < Date.now()) {
      logout();
      return null;
    }
    return user;
  }
  return null;
};

// Function to update user profile
export const updateProfile = async (userData) => {
  try {
    const user = getCurrentUser();
    if (user && user.token) {
      const response = await axios.put(API_URL + 'update', userData, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    }
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};