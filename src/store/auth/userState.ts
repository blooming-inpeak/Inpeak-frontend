import { atom } from 'recoil';

export interface UserInfo {
  nickname: string;
  kakaoemail: string;
  interests: string[];
}

export const userState = atom<UserInfo | null>({
  key: 'userState',
  default: null,
});
