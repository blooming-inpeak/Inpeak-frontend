import api from '../apiClient';

export const fetchRecentAnswers = async (status: 'ALL' | 'CORRECT' | 'INCORRECT' | 'SKIPPED') => {
  try {
    const response = await api.get('/answer/recent', {
      params: { status },
    });

    if (response.status === 200) {
      return { success: true, data: response.data.recentAnswers };
    } else {
      return { success: false, message: '답변 데이터를 불러오는데 실패했습니다.' };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('💥 최근 질문 히스토리 API 오류:', error);
    return { success: false, message: '답변 데이터를 불러오는데 오류가 발생했습니다.' };
  }
};
