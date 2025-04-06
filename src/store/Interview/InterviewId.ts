import { atom } from 'recoil';

export const InterviewIdState = atom<number | null>({
  key: 'InterviewIdState',
  default: null,
});
