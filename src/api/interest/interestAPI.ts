import api from '../apiClient';

export const registerInterest = async (interestTypes: string[]) => {
  try {
    const response = await api.post('/interest', { interestTypes });

    if (response.status === 201) {
      return { success: true };
    } else {
      return { success: false, message: '관심분야 등록 실패' };
    }
  } catch (error) {
    console.error('관심분야 등록 중 오류 발생:', error);
    return { success: false, message: '관심분야 등록 중 오류 발생' };
  }
};
