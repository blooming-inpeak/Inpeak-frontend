import api from '../api';

export const SaveNicknameAPI = async (nickname: string) => {
  try {
    const response = await api.patch(
      '/member',
      {
        nickname,
      },
      {},
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
