import { useRecoilState } from 'recoil';
import { GetAnswerDetailResponse } from '../../api/types';
import { answerCacheState } from '../../store/Interview/AnswerCacheState';
import { useCallback } from 'react';

export const useAnswerCache = () => {
  const [cache, setCache] = useRecoilState(answerCacheState);

  const get = useCallback((id: number) => cache[id], [cache]);
  const set = useCallback(
    (id: number, value: GetAnswerDetailResponse) => {
      setCache(prev => ({ ...prev, [id]: value }));
    },
    [setCache],
  );

  return { get, set };
};
