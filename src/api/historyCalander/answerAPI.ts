import api from '../apiClient';

export const fetchAnswerDataByDate = async (date: string) => {
  try {
    const response = await api.get('/answer/date', {
      params: { date },
    });
    return response.data;
  } catch (error) {
    console.error('Answer data fetch failed:', error);
    throw error;
  }
};
