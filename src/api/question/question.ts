import axios from 'axios';
import { apiClient } from '../apiClient';

export const PassQuestion = async (questionId: string, interviewId: string) => {
  try {
    const response = await apiClient.post(
      '/answer/skip',
      {
        questionId,
        interviewId,
      },
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJpbnBlYWsiLCJpYXQiOjIyMjIyMjIyMjIsImV4cCI6MzMzMzMzMzMzMywic3ViIjoiMyJ9.cFBpPAPdOggAePoyuveOrMqMb-EQ1U730XbjsGfsStU',
        },
      },
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getVideoUrl = async (startDate: string) => {
  try {
    const response = await apiClient.get('/answer/presigned-url', {
      params: {
        startDate,
        extension: 'webm',
      },
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJpbnBlYWsiLCJpYXQiOjIyMjIyMjIyMjIsImV4cCI6MzMzMzMzMzMzMywic3ViIjoiMyJ9.cFBpPAPdOggAePoyuveOrMqMb-EQ1U730XbjsGfsStU',
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
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
    console.log(error);
  }
};

export const AnswerQuestion = async (
  audioFile: string,
  time: number,
  questionId: number,
  interviewId: number,
  videoURL: string,
) => {
  try {
    const response = await apiClient.post(
      '/answer/create',
      {
        audioFile,
        time,
        questionId,
        interviewId,
        videoURL,
      },
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJpbnBlYWsiLCJpYXQiOjIyMjIyMjIyMjIsImV4cCI6MzMzMzMzMzMzMywic3ViIjoiMyJ9.cFBpPAPdOggAePoyuveOrMqMb-EQ1U730XbjsGfsStU',
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const GetQuestion = async (today: string) => {
  try {
    const response = await apiClient.post(
      '/interview/start',
      {},
      {
        params: { startDate: today },
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJpbnBlYWsiLCJpYXQiOjIyMjIyMjIyMjIsImV4cCI6MzMzMzMzMzMzMywic3ViIjoiMyJ9.cFBpPAPdOggAePoyuveOrMqMb-EQ1U730XbjsGfsStU',
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
