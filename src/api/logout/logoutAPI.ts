import api from '../apiClient';

export const logoutAPI = async () => {
  return await api.post('/auth/logout');
};
