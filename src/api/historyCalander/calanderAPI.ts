import { apiClient } from '../apiClient';

export const fetchInterviewCalendarData = async (month: string, year: string, token: string) => {
  try {
    const response = await apiClient.get('/interview/calendar', {
      params: { month, year },
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('인터뷰 캘린더 데이터를 불러오는데 실패했습니다.', error);
    throw error;
  }
};
