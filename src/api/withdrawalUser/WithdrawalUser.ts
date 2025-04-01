import axios from 'axios';

export const WithdrawalUser = async () => {
  try {
    const response = await axios.delete('/member', {
      headers: {
        Authorization: '',
        'Content-Type': 'application/json',
      },
    });

    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
