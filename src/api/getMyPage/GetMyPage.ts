import api from '../apiClient';

export const GetMyPage = async () => {
  try {
    const response = await api.get('/member/my', {});
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
