// api/historyCalander/overallInterviewAPI.ts
import { apiClient } from '../apiClient';

export const fetchOverallInterviewHistory = async (token: string) => {
  try {
    // month, year 필터 없이 전체 면접 데이터를 반환하는 API 호출
    const response = await apiClient.get('/interview/history', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('전체 면접 이력 데이터를 불러오는데 실패했습니다.', error);
    return [];
  }
};
