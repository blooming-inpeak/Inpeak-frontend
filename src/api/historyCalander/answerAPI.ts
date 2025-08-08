import api from '../api';

type AnswerStatus = 200 | 204 | 401 | 409 | number;

interface AnswerResponse {
  createdAt: string;
  startDate: string;
  answers: {
    answerId: number;
    dateTime: string;
    questionContent: string;
    runningTime: number;
    answerStatus: 'CORRECT' | 'INCORRECT' | 'SKIPPED';
    isUnderstood: boolean;
  }[];
  status: AnswerStatus;
}

export const fetchAnswerDataByDate = async (date: string): Promise<AnswerResponse | null> => {
  try {
    const response = await api.get('/answer/date', {
      params: { date },
      validateStatus: () => true,
    });

    const { status } = response;

    // 204: 바디 없음 → 안전 객체로 변환해서 반환
    if (status === 204) {
      return {
        createdAt: '',
        startDate: date,
        answers: [],
        status: 204,
      };
    }

    // 200대: 정상
    if (status >= 200 && status < 300) {
      const data = response.data ?? {};
      return {
        createdAt: data.createdAt ?? '',
        startDate: data.startDate ?? date,
        answers: Array.isArray(data.answers) ? data.answers : [],
        status,
      };
    }

    // 401: 비로그인
    if (status === 401) {
      return {
        createdAt: '',
        startDate: '',
        answers: [],
        status: 401,
      };
    }

    // 409: 질문은 있는데 답변 없음
    if (status === 409) {
      const data = response.data ?? {};
      return {
        createdAt: data.createdAt ?? '',
        startDate: data.startDate ?? date,
        answers: [],
        status: 409,
      };
    }

    // 그 외: 실패
    console.error('Answer data fetch failed: unexpected status', status, response.data);
    return null;
  } catch (error) {
    console.error('Answer data fetch failed:', error);
    return null;
  }
};
