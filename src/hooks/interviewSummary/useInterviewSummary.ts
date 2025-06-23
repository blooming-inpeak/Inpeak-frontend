import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { summaryState } from '../../store/Interview/summaryState';
import { fetchTodayInterviewSummary } from '../../api/interview/interviewAPI';

export function useInterviewSummary(kakaoEmail: string | undefined) {
  const setSummary = useSetRecoilState(summaryState);
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTodayInterviewSummary(today);
        setSummary(data);
      } catch (error) {
        console.error('📛 인터뷰 요약 로딩 실패:', error);
      }
    };

    fetchData();
  }, [kakaoEmail]);
}
