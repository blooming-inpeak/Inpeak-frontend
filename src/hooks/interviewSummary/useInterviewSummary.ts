import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { summaryState } from '../../store/Interview/summaryState';
import { fetchTodayInterviewSummary } from '../../api/interview/interviewAPI';

export function useInterviewSummary(kakaoEmail: string | undefined) {
  const setSummary = useSetRecoilState(summaryState);
  const today = new Date().toISOString().split('T')[0];
  const cacheKey = kakaoEmail ? `summary-${kakaoEmail}` : 'summary';

  useEffect(() => {
    const cached = localStorage.getItem(cacheKey);
    let shouldFetch = true;

    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (parsed?.date === today && parsed?.data) {
          setSummary(parsed.data);
          shouldFetch = false;
        }
      } catch {
        // 캐시 파싱 에러 무시
      }
    }

    if (shouldFetch) {
      const fetchData = async () => {
        try {
          const data = await fetchTodayInterviewSummary(today);
          setSummary(data);
          localStorage.setItem(cacheKey, JSON.stringify({ date: today, data }));
        } catch (error) {
          console.error('📛 인터뷰 요약 로딩 실패:', error);
        }
      };
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kakaoEmail]);
}
