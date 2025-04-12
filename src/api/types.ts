export interface GetIncorrectAnswersParams {
  sortType: 'ASC' | 'DESC';
  status: 'ALL' | 'INCORRECT' | 'SKIPPED';
  page: number;
}
export type AnswerStatus = 'CORRECT' | 'SKIPPED' | 'INCORRECT' | 'ALL';

export interface AnswerResponse {
  answerId: number;
  dateTime: string;
  questionContent: string;
  runningTime: number | null;
  answerStatus: AnswerStatus;
  isUnderstood: boolean;
}

export interface GetIncorrectAnswersResponse {
  AnswerResponseList: AnswerResponse[];
  hasNext: boolean;
}
export interface GetAnsweredListParams {
  sortType: 'ASC' | 'DESC';
  isUnderstood?: boolean;
  page: number;
}

export interface GetAnsweredListResponse {
  AnswerResponseList: AnswerResponse[];
  hasNext: boolean;
}
export interface GetAnswerDetailParams {
  interviewId: number;
  questionId: number;
}

export interface GetAnswerDetailResponse {
  dateTime: string;
  questionContent: string;
  runningTime: number;
  answerStatus: AnswerStatus;
  isUnderstood: boolean;
  userAnswer: string;
  comment?: string;
  videoUrl?: string;
  AIAnswer: string;
}
