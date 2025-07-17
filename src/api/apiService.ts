import api from './index';
import {
  GetAnsweredListParams,
  GetAnsweredListResponse,
  GetIncorrectAnswersParams,
  GetAnswerDetailResponse,
} from './types';

//히스토리 오답노트
export const getIncorrectAnswers = (params: GetIncorrectAnswersParams) => {
  return api.get('/answer/incorrect', { params });
};
//히스토리 답변완료
export const getAnsweredList = (params: GetAnsweredListParams) => {
  return api.get<GetAnsweredListResponse>('/answer/correct', { params });
};

export const getTaskStatus = async (
  taskId: number,
): Promise<{
  taskId: number;
  status: 'WAITING' | 'SUCCESS' | 'FAILED';
  answerId: number | null;
}> => {
  const res = await api.get(`/v2/answer/tasks/${taskId}`);
  return res.data;
};

export const getAnswerDetailById = async (answerId: number): Promise<GetAnswerDetailResponse> => {
  const res = await api.get<GetAnswerDetailResponse>(`/v2/answer/${answerId}`);
  return res.data;
};
//메모 작성
export const updateAnswerComment = async (answerId: number, comment: string) => {
  const res = await api.put('/answer/comment', {
    answerId,
    comment,
  });
  return res.data;
};
//이해완료 상태 변경
export const updateAnswerUnderstood = async (answerId: number, isUnderstood: boolean) => {
  return api.put('/answer/understood', {
    answerId,
    isUnderstood,
  });
};
