import { atom } from 'recoil';

export interface QuestionType {
  id: number;
  content: string;
}

export const QuestionsState = atom<QuestionType[]>({
  key: 'QuestionsState',
  default: [],
});
