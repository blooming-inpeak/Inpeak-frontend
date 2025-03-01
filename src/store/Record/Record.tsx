import { atom } from 'recoil';

export const isRecordingState = atom<boolean>({
  key: 'isRecordingState',
  default: true,
});

export const currentMicState = atom<string>({
  key: 'currentMicState',
  default: '',
});
