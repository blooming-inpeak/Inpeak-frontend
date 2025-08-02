import api from '../api';

export const fetchAnswerDataByDate = async (date: string) => {
  try {
    const response = await api.get('/answer/date', {
      params: { date },
    });

    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const status = error?.response?.status;

    // 🔐 로그인 안 됨
    if (status === 401) {
      return {
        createdAt: '',
        startDate: '',
        answers: [],
        status: 401,
      };
    }

    // ❌ 질문+답변 없음
    if (status === 404) {
      return {
        createdAt: '',
        startDate: '',
        answers: [],
        status: 404,
      };
    }

    // ⚠️ 질문은 있는데 답변 없음
    if (status === 409) {
      return {
        createdAt: error.response.data.createdAt ?? '',
        startDate: error.response.data.startDate ?? '',
        answers: [],
        status: 409,
      };
    }

    console.error('Answer data fetch failed:', error);
    return null;
  }
};
