// services/auth.js
import api from './api';
import * as SecureStore from 'expo-secure-store';

export const authService = {
  async login(email, password) {
    try {
      const response = await api.post('/auth/login/', { email, password });
      const { access_token, refresh_token, user } = response.data;
      
      await SecureStore.setItemAsync('access_token', access_token);
      await SecureStore.setItemAsync('refresh_token', refresh_token);
      await SecureStore.setItemAsync('user', JSON.stringify(user));
      
      return user;
    } catch (error) {
        console.log("error", error)
      const errorMessage = error.response?.data?.email?.[0] || 
                          error.response?.data?.password?.[0] || 
                          error.response?.data?.non_field_errors?.[0] || 
                          'Login failed';
      throw new Error(errorMessage);
    }
  },

  async register(email, username, password, firstName = '', lastName = '') {
    try {
      const response = await api.post('/auth/register/', { 
        email, 
        username, 
        password,
        first_name: firstName,
        last_name: lastName
      });
      const { access_token, refresh_token, user } = response.data;
      
      await SecureStore.setItemAsync('access_token', access_token);
      await SecureStore.setItemAsync('refresh_token', refresh_token);
      await SecureStore.setItemAsync('user', JSON.stringify(user));
      
      return user;
    } catch (error) {
      const errorMessage = error.response?.data?.email?.[0] || 
                          error.response?.data?.username?.[0] || 
                          error.response?.data?.password?.[0] || 
                          'Registration failed';
      throw new Error(errorMessage);
    }
  },

  async logout() {
    try {
      await api.post('/auth/logout/');
    } catch (error) {
      console.log('Logout error:', error);
    } finally {
      await SecureStore.deleteItemAsync('access_token');
      await SecureStore.deleteItemAsync('refresh_token');
      await SecureStore.deleteItemAsync('user');
    }
  },

  async getCurrentUser() {
    try {
      const userStr = await SecureStore.getItemAsync('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      return null;
    }
  },

  async isAuthenticated() {
    try {
      const token = await SecureStore.getItemAsync('access_token');
      return !!token;
    } catch (error) {
      return false;
    }
  },
};