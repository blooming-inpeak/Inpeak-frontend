export interface GetIncorrectAnswersParams {
  sortType: 'ASC' | 'DESC';
  status: 'ALL' | 'INCORRECT' | 'SKIPPED';
  page: number;
}

export interface AnswerResponse {
  dateTime: string;
  questionContent: string;
  runningTime: number | null;
  answerStatus: 'ALL' | 'INCORRECT' | 'SKIPPED' | 'CORRECT';
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
