import { atom } from 'recoil';

export interface UserInfo {
  nickname: string;
  kakaoEmail: string;
  interests: string[];
}

export const userState = atom<UserInfo | null>({
  key: 'userState',
  default: null,
});
