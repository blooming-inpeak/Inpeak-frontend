import { atom } from 'recoil';

export interface Result {
  question: string;
  time: number;
  isAnswer: boolean;
  taskId: number;
}

export const ResultState = atom<Result[]>({
  key: 'ResultState',
  default: [],
});
