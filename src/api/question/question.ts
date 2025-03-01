import axios from 'axios';

export const PassQuestion = async () => {
  try {
    const response = await axios.post(
      'url',
      {
        questionId: '2',
        interviewId: '4',
      },
      {
        headers: { Authorization: '' },
      },
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
