export interface RecentAnswerItem {
  interviewId: number;
  questionId: number;
  answerId: number;
  questionContent: string;
  answerContent: string;
  answerStatus: 'CORRECT' | 'INCORRECT' | 'SKIPPED';
}
