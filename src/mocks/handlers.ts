import { http, HttpResponse } from 'msw';

const retryCountMap: Record<string, number> = {};

export const handlers = [
  // 히스토리 오답노트 - 에러 응답
  http.get('https://api.inpeak.kr/api/v2/answer/incorrect', () => {
    return HttpResponse.json({ message: '오답노트 데이터를 불러오는 중 에러가 발생했습니다.' }, { status: 500 });
  }),

  // 히스토리 답변완료 - 에러 응답
  http.get('https://api.inpeak.kr/api/v2/answer/correct', () => {
    return HttpResponse.json({ message: '답변완료 데이터를 불러오는 중 에러가 발생했습니다.' }, { status: 400 });
  }),
  // 🔹 /answer/tasks/:taskId → 상태 확인용
  http.get('https://api.inpeak.kr/api/v2/answer/tasks/:taskId', ({ params }) => {
    const { taskId } = params;
    const taskIdStr = String(taskId);

    if (taskIdStr === '999') {
      retryCountMap[taskIdStr] = (retryCountMap[taskIdStr] || 0) + 1;

      if (retryCountMap[taskIdStr] < 1) {
        return HttpResponse.json({
          taskId: Number(taskIdStr),
          status: 'WAITING',
          answerId: null,
        });
      } else {
        return HttpResponse.json({
          taskId: Number(taskIdStr),
          status: 'SUCCESS',
          answerId: 888,
        });
      }
    }
    if (taskIdStr === '777') {
      retryCountMap[taskIdStr] = (retryCountMap[taskIdStr] || 0) + 1;

      if (retryCountMap[taskIdStr] < 4) {
        return HttpResponse.json({
          taskId: 777,
          status: 'WAITING',
          answerId: null,
        });
      } else {
        return HttpResponse.json({
          taskId: 777,
          status: 'FAILED',
          answerId: null,
        });
      }
    }

    if (taskIdStr === '111') {
      return HttpResponse.json({
        taskId: 111,
        status: 'WAITING',
        answerId: null,
      });
    }

    if (taskIdStr === '222') {
      return HttpResponse.json({
        taskId: 222,
        status: 'SUCCESS',
        answerId: 999,
      });
    }

    if (taskIdStr === '333') {
      return HttpResponse.json({
        taskId: 333,
        status: 'FAILED',
        answerId: null,
      });
    }

    return HttpResponse.json({
      taskId: Number(taskIdStr),
      status: 'WAITING',
      answerId: null,
    });
  }),

  // 🔹 /answer/:answerId → 답변 상세
  http.get('https://api.inpeak.kr/api/v2/answer/:answerId', ({ params }) => {
    const { answerId } = params;
    const id = String(answerId);

    const detailMap: Record<string, AnswerDetail> = {
      '888': {
        answerStatus: 'CORRECT',
        isUnderstood: false,
        comment: '888 답변에 대한 코멘트입니다.',
        dateTime: new Date().toISOString(),
        questionContent: '888번 질문입니다. 재시도 후 성공된 항목입니다.',
        userAnswer: '이것은 888번에 대한 사용자 응답입니다.',
        AIAnswer: '이렇게 말해보세요! (888)',
        runningTime: 12,
        videoUrl: '',
      },
      '999': {
        answerStatus: 'CORRECT',
        isUnderstood: false,
        comment: '999에 대한 기본 코멘트입니다.',
        dateTime: new Date().toISOString(),
        questionContent: '999번 질문입니다. 즉시 성공된 항목입니다.',
        userAnswer: '이것은 999번에 대한 사용자 응답입니다.',
        AIAnswer: '이렇게 말해보세요! (999)',
        runningTime: 15,
        videoUrl: '',
      },
      '111': {
        answerStatus: 'INCORRECT',
        isUnderstood: false,
        comment: '111은 아직 처리 중인 상태입니다.',
        dateTime: new Date().toISOString(),
        questionContent: '111번 질문입니다.',
        userAnswer: '이것은 111번에 대한 사용자 응답입니다.',
        AIAnswer: '이렇게 말해보세요! (111)',
        runningTime: 10,
        videoUrl: '',
      },
      '333': {
        answerStatus: 'SKIPPED',
        isUnderstood: false,
        comment: '333은 실패 상태입니다.',
        dateTime: new Date().toISOString(),
        questionContent: '333번 질문입니다.',
        userAnswer: '',
        AIAnswer: '이렇게 말해보세요! (333)',
        runningTime: 0,
        videoUrl: '',
      },
    };

    const detail = detailMap[id] ?? {
      answerStatus: 'INCORRECT',
      isUnderstood: false,
      comment: '',
      dateTime: new Date().toISOString(),
      questionContent: `기본 질문 내용입니다. (ID: ${id})`,
      userAnswer: `기본 사용자 응답입니다. (ID: ${id})`,
      AIAnswer: '기본 피드백입니다.',
      runningTime: 5,
      videoUrl: '',
    };

    return HttpResponse.json(detail);
  }),
];

// ✅ 타입 정의
type AnswerDetail = {
  answerStatus: 'CORRECT' | 'INCORRECT' | 'SKIPPED';
  isUnderstood: boolean;
  comment: string;
  dateTime: string;
  questionContent: string;
  userAnswer: string;
  AIAnswer: string;
  runningTime: number;
  videoUrl: string;
};
