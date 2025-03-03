import React from 'react';
import styled from 'styled-components';
import { CaptionType } from '../common/caption/CaptionType';
import { MultiCaption } from '../common/caption/Caption';

interface AskHistoryBoxProps {
  question: string;
  answer: string;
  status: CaptionType;
  detailUrl?: string;
}

export const AskHistoryBox: React.FC<AskHistoryBoxProps> = ({ question, answer, status, detailUrl }) => {
  const handleDetailClick = () => (window.location.href = detailUrl!);

  return (
    <AskHistoryBoxWrapper>
      <AskHistoryContent>
        <div style={{ display: 'flex' }}>
          <AskHistoryQuestion>{question}</AskHistoryQuestion>
          <MultiCaption type={status} />
        </div>
        <AskHistoryAnswer>{answer}</AskHistoryAnswer>
      </AskHistoryContent>
      <DetailButton onClick={handleDetailClick}>
        <img src="/images/chevron/Chevron_right_black.svg" alt="chevron right" style={{ cursor: 'pointer' }} />
      </DetailButton>
    </AskHistoryBoxWrapper>
  );
};

export const AskHistoryBoxWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 24px;

  & + & {
    padding-top: 24px;
    border-top: 1px solid #f1f1f1;
  }
`;

export const AskHistoryContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const AskHistoryQuestion = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-right: 6px;
`;

export const AskHistoryAnswer = styled.div`
  color: #747474;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: -0.3px;
`;

export const DetailButton = styled.div`
  cursor: pointer;
`;
