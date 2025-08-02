import api from '../api';

export const registerInterest = async (interestTypes: string[]) => {
  try {
    const response = await api.post('/interest', { interestTypes });

    if (response.status === 201) {
      console.log('✅ 관심분야 등록 성공:', response.data);
      return { success: true };
    } else {
      console.warn('⚠️ 예상치 못한 응답 상태:', response.status);
      return { success: false, message: '관심분야 등록 실패' };
    }
  } catch (error) {
    console.error('❌ 관심분야 등록 중 오류 발생:', error);
    return { success: false, message: '관심분야 등록 중 오류 발생' };
  }
};
