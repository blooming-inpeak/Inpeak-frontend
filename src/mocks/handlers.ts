import { http, HttpResponse } from 'msw';

let retryCount = 0;

export const handlers = [
  http.get('https://api.inpeak.kr/api/v2/answer/tasks/:taskId', ({ params }) => {
    const { taskId } = params;

    if (taskId === '999') {
      retryCount++;

      if (retryCount < 3) {
        return HttpResponse.json({
          taskId: Number(taskId),
          status: 'WAITING',
          answerId: null,
        });
      } else {
        return HttpResponse.json({
          taskId: Number(taskId),
          status: 'SUCCESS',
          answerId: 888, // 성공 시 생성된 answerId
        });
      }
    }

    // 기본 응답들 (111, 222, 333 등)
    if (taskId === '111') {
      return HttpResponse.json({ taskId: 111, status: 'WAITING', answerId: null });
    }

    if (taskId === '222') {
      return HttpResponse.json({ taskId: 222, status: 'SUCCESS', answerId: 999 });
    }

    if (taskId === '333') {
      return HttpResponse.json({ taskId: 333, status: 'FAILED', answerId: null });
    }

    return HttpResponse.json({
      taskId: Number(taskId),
      status: 'WAITING',
      answerId: null,
    });
  }),

  http.get('https://api.inpeak.kr/api/v2/answer/:answerId', ({ params }) => {
    const { answerId } = params;
    console.log('[MSW] 요청된 answerId:', answerId);

    return HttpResponse.json({
      answerStatus: 'CORRECT',
      isUnderstood: false,
      comment: '',
      dateTime: new Date().toISOString(),
      questionContent: '자기소개 해주세요',
      userAnswer: '안녕하세요. 저는 ...',
      AIAnswer: '이렇게 말해보세요!',
      runningTime: 25,
      videoUrl: '',
    });
  }),
];
