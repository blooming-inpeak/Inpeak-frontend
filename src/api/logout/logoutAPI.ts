import api from '../index';

export const logoutAPI = async () => {
  return await api.post('/auth/logout');
};
