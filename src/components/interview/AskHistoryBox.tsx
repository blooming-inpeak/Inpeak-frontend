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
        <AskHistoryTop>
          <AskHistoryQuestion>{question}</AskHistoryQuestion>
          <AskHistoryCaptionWrapper>
            <MultiCaption type={status} />
          </AskHistoryCaptionWrapper>
        </AskHistoryTop>
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
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #eff5ff;
  }
`;

export const AskHistoryContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  min-width: 0;
`;

const AskHistoryTop = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 0;
`;

export const AskHistoryQuestion = styled.div`
  flex: 1;
  font-size: 14px;
  font-weight: 600;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-right: 8px;
`;

const AskHistoryCaptionWrapper = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
`;

export const AskHistoryAnswer = styled.div`
  color: #747474;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: -0.3px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
`;
