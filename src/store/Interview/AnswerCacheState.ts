import { atom } from 'recoil';
import { GetAnswerDetailResponse } from '../../api/types';

export const answerCacheState = atom<Record<number, GetAnswerDetailResponse>>({
  key: 'answerCacheState',
  default: {},
});
