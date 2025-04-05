import { atom } from 'recoil';

export const userState = atom<{
  nickname: string;
  email: string;
  interests: string[];
} | null>({
  key: 'userState',
  default: null,
});
