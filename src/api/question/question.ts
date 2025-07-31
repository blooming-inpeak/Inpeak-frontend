import axios from 'axios';
import api from '../api';

import { AnswerQuestionRequest } from '../types';

export const PassQuestion = async (questionId: string, interviewId: string) => {
  try {
    const response = await api.post(
      '/answer/skip',
      {
        questionId,
        interviewId,
      },
      {},
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getVideoUrl = async (startDate: string, isVideo: boolean) => {
  try {
    const params = {
      startDate,
      includeVideo: isVideo,
      ...(isVideo && {
        extension: 'webm',
      }),
    };
    const response = await api.get('/answer/presigned-url', {
      params,
    });

    return response.data;
  } catch (error) {
    console.log('presigned-url 오류:', error);
  }
};

export const uploadVideoToS3 = async (file: Blob, presignedURL: string, type: string) => {
  try {
    await axios.put(presignedURL, file, {
      headers: {
        'Content-Type': type,
      },
    });
    console.log('S3에 영상 업로드 성공');
  } catch (error) {
    console.log('S3 영상 업로드 오류: ', error);
  }
};

export const AnswerQuestion = async (Request: AnswerQuestionRequest) => {
  try {
    const response = await api.post('/v2/answer/create', Request);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const GetQuestion = async (today: string) => {
  try {
    const response = await api.post(
      '/interview/start',
      {},
      {
        params: { startDate: today },
      },
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
