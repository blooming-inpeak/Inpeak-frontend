import { apiClient } from '../apiClient';

export const GetMyPage = async () => {
  try {
    const response = await apiClient.get('/api/member/my', {
      headers: {
        Authorization: '',
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
