import { apiClient } from '../apiClient';

export const fetchAnswerDataByDate = async (date: string, token: string) => {
  try {
    const response = await apiClient.get('/answer/date', {
      params: { date },
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Answer data fetch failed:', error);
    throw error;
  }
};
