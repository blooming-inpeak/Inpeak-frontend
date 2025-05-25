import React from 'react';
import styled from 'styled-components';
import { CaptionType } from '../common/caption/CaptionType';
import { MultiCaption } from '../common/caption/Caption';

interface AskHistoryBoxProps {
  question: string;
  answer: string;
  status: CaptionType;
  onClick?: () => void;
}

export const AskHistoryBox: React.FC<AskHistoryBoxProps> = ({ question, answer, status, onClick }) => {
  return (
    <AskHistoryBoxWrapper onClick={onClick}>
      <AskHistoryContent>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <AskHistoryQuestion>{question}</AskHistoryQuestion>
          <MultiCaption type={status} />
        </div>
        <AskHistoryAnswer>{answer}</AskHistoryAnswer>
      </AskHistoryContent>
    </AskHistoryBoxWrapper>
  );
};

export const AskHistoryBoxWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  height: 103px;
  display: flex;
  align-items: center;
  padding: 20px;
  cursor: pointer;
  border-radius: 12px;
  &:hover {
    background-color: #eff5ff;
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
