// api/historyCalander/overallInterviewAPI.ts
import { apiClient } from '../apiClient';

export const fetchOverallInterviewHistory = async (token: string) => {
  try {
    const response = await apiClient.get('/interview/history', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('전체 면접 이력 데이터를 불러오는데 실패했습니다.', error);
    return [];
  }
};
