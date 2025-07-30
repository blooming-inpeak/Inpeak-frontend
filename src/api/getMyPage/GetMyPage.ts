import api from '../index';

export const GetMyPage = async () => {
  try {
    const response = await api.get('/member/my', {});
    return response.data;
  } catch (error) {
    console.error('❌ 마이페이지 정보 불러오기 실패:', error);
    throw error;
  }
};
