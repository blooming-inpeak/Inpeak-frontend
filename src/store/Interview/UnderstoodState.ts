import { atom } from 'recoil';

export const UnderstoodState = atom<Record<string, boolean>>({
  key: 'UnderstoodState',
  default: {},
});
