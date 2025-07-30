import api from '../index';

export interface HistoryStatisticsData {
  totalAnswerCount: number;
  correctAnswerCount: number;
  incorrectAnswerCount: number;
  skippedAnswerCount: number;
  totalInterviewCount: number;
  totalRunningTime: number;
}

export const fetchHistoryStatistics = async (): Promise<HistoryStatisticsData> => {
  try {
    const response = await api.get('/answer/summary');
    return response.data;
  } catch (error) {
    console.error('히스토리 통계 데이터를 불러오는데 실패했습니다.', error);

    // ✅ 실패 시 기본값 반환
    return {
      totalAnswerCount: 0,
      correctAnswerCount: 0,
      incorrectAnswerCount: 0,
      skippedAnswerCount: 0,
      totalInterviewCount: 0,
      totalRunningTime: 0,
    };
  }
};
