import axios from 'axios';
import api from '../apiClient';

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

export const getVideoUrl = async (startDate: string) => {
  try {
    const response = await api.get('/answer/presigned-url', {
      params: {
        startDate,
        extension: 'webm',
      },
    });

    return response.data;
  } catch (error) {
    console.log('presigned-url 오류:', error);
  }
};

export const uploadVideoToS3 = async (file: Blob, presignedURL: string) => {
  try {
    await axios.put(presignedURL, file, {
      headers: {
        'Content-Type': 'video/webm',
      },
    });
    console.log('S3에 영상 업로드 성공');
  } catch (error) {
    console.log('S3 영상 업로드 오류: ', error);
  }
};

export const AnswerQuestion = async (formData: FormData) => {
  try {
    const response = await api.post('/answer/create', formData);

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
