import api from '../index';

// 📘 응답 타입 정의
export interface InterviewSummaryResponse {
  successRate: {
    userSuccessRate: number;
    averageSuccessRate: number;
  };
  remainingInterviews: {
    count: number;
  };
  levelInfo: {
    level: number;
    currentExp: number;
    nextExp: number;
  };
  recentAnswers: {
    interviewId: number;
    questionId: number;
    answerId: number;
    questionContent: string;
    answerContent: string;
    answerStatus: 'CORRECT' | 'INCORRECT' | 'SKIPPED';
  }[];
}

// 📌 오늘 날짜 기준 인터뷰 요약 정보 불러오기
export const fetchTodayInterviewSummary = async (startDate: string): Promise<InterviewSummaryResponse> => {
  try {
    const response = await api.get('/interview', {
      params: { startDate },
    });

    return response.data;
  } catch (error) {
    console.error('📛 오늘의 인터뷰 요약 정보 불러오기 실패:', error);
    throw error;
  }
};
