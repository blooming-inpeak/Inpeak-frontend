import axios from 'axios';

export const SaveNicknameAPI = async (nickname: string) => {
  try {
    const response = await axios.patch(
      '/member',
      {
        nickname,
      },
      {
        headers: {
          Authorization: '',
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
