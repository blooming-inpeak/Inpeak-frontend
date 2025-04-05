// src/api/auth/logoutAPI.js
import api from '../apiClient';

export const logoutAPI = async () => {
  return await api.post('/auth/logout');
};
