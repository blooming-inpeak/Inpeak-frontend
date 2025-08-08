import api from '../api';

export const updateInterest = async (interestTypes: string[]) => {
  try {
    const response = await api.put('/interest', { interestTypes });

    if (response.status === 200) {
      console.log('✅ 관심분야 수정 성공:', response.data);
      return { success: true };
    } else {
      return { success: false, message: '관심분야 수정 실패' };
    }
  } catch (error) {
    console.error('❌ 수정 실패:', error);
    return { success: false, message: '수정 중 오류 발생' };
  }
};
