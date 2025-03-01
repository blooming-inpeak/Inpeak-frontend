import { useState } from 'react';
import { BlurBackground } from '../../components/common/background/BlurBackground';
import { AbandonResult } from '../../components/InterviewResult/AbandonResult';
import { ResultTemplate } from '../../components/InterviewResult/ResultTemplate';

export const ResultPage = () => {
  const [status] = useState<'정답' | '오답' | '포기'>('포기');

  return <BlurBackground>{status === '포기' ? <AbandonResult /> : <ResultTemplate status={status} />}</BlurBackground>;
};
