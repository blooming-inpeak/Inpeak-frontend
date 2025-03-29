import api from '../apiClient';

export const fetchInterviewCalendarData = async (month: string, year: string) => {
  try {
    const response = await api.get('/interview/calendar', {
      params: { month, year },
    });
    return response.data;
  } catch (error) {
    console.error('인터뷰 캘린더 데이터를 불러오는데 실패했습니다.', error);
    throw error;
  }
};
