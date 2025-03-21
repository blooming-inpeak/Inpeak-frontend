import axios from 'axios';

export const GetInterest = async () => {
  try {
    const response = await axios.get('/interest/list', {
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
