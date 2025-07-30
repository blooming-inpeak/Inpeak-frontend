import api from '../index';

export const fetchInterviewCalendarData = async (month: string, year: string) => {
  try {
    const response = await api.get('/interview/calendar', {
      params: { month, year },
    });
    return response.data; // { calendarList: [...], exists: true/false }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error?.response?.status === 401) {
      return { calendarList: [], exists: false };
    }

    console.error('인터뷰 캘린더 데이터를 불러오는데 실패했습니다.', error);
    return { calendarList: [], exists: false };
  }
};
