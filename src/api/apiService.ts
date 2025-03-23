import api from './api';
import { GetAnsweredListParams, GetAnsweredListResponse, GetIncorrectAnswersParams } from './types';

//히스토리 오답노트
export const getIncorrectAnswers = (params: GetIncorrectAnswersParams) => {
  return api.get('/answer/incorrect', { params });
};
//히스토리 답변완료
export const getAnsweredList = (params: GetAnsweredListParams) => {
  return api.get<GetAnsweredListResponse>('/answer/correct', { params });
};
