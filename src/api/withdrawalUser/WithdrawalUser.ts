import api from '../index';

export const WithdrawalUser = async () => {
  try {
    const response = await api.delete('/member');

    console.log(response);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
