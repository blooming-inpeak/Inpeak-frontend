import { atom } from 'recoil';
import { InterviewSummaryResponse } from '../../api/interview/interviewAPI';

export const summaryState = atom<InterviewSummaryResponse | null>({
  key: 'summaryState',
  default: null,
});
