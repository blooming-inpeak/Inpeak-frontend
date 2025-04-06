import api from '../apiClient';

export const fetchAnswerDataByDate = async (date: string) => {
  try {
    const response = await api.get('/answer/date', {
      params: { date },
    });
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error?.response?.status === 401) {
      return {
        createdAt: '',
        startDate: '',
        answers: [],
      };
    }

    console.error('Answer data fetch failed:', error);
    return null;
  }
};
