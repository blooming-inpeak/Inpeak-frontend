import axios from 'axios';

export const PassQuestion = async () => {
  try {
    const response = await axios.post(
      'url/answer/skip',
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

export const GetQuestion = async (today: string) => {
  try {
    const response = await axios.post(
      'url/interview/start',
      {},
      {
        params: { startDate: today },
        headers: { Authorization: '', 'Content-Type': 'application/json' },
      },
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
