import api from '../index';
import { RecentAnswerItem } from './recentAnswerItem';

export const fetchRecentAnswers = async (
  status: 'ALL' | 'CORRECT' | 'INCORRECT' | 'SKIPPED',
): Promise<{ success: boolean; data?: RecentAnswerItem[]; message?: string }> => {
  try {
    const response = await api.get('/answer/recent', {
      params: { status },
    });

    return {
      success: true,
      data: response.data.recentAnswers,
    };
  } catch (error) {
    console.error('💥 최근 질문 히스토리 API 오류:', error);
    return {
      success: false,
      message: '답변 데이터를 불러오는데 오류가 발생했습니다.',
    };
  }
};
