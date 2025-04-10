import { atom } from 'recoil';

export const authInitializedState = atom<boolean>({
  key: 'authInitializedState',
  default: false,
});
