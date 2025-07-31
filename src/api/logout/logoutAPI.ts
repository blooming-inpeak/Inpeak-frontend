import api from '../api';

export const logoutAPI = async () => {
  return await api.post('/auth/logout');
};
