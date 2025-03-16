import { atom } from 'recoil';

export interface QuestionType {
  id: number;
  content: string;
}

export const QuestionsState = atom<QuestionType[]>({
  key: 'QuestionsState',
  default: [
    {
      id: 4,
      content: 'What is Java?',
    },
    {
      id: 87,
      content: 'Explain Spring Boot basics.',
    },
    {
      id: 3,
      content: 'How does Dependency Injection work?',
    },
  ],
});
