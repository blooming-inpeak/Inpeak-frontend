import { atom } from 'recoil';

export const redirectAfterLoginState = atom<string | null>({
  key: 'redirectAfterLoginState',
  default: null,
});
