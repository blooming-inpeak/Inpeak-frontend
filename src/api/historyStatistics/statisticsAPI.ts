import api from '../apiClient';

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
    throw error;
  }
};
