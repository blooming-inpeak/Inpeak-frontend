import { atom } from 'recoil';

export const isRecordingState = atom<boolean>({
  key: 'isRecordingState',
  default: false,
});

export const currentMicState = atom<string>({
  key: 'currentMicState',
  default: '',
});

export const isMicConnectedState = atom<boolean>({
  key: 'isMicConnectedState',
  default: false,
});
