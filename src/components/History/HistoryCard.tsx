import React from 'react';
import styled from 'styled-components';
import { MultiCaption } from '../common/caption/Caption';

interface AnswerData {
  id: number;
  date: string;
  content: string;
  time: string;
}

interface HistoryCardProps {
  answer: AnswerData;
}

const HistoryCard: React.FC<HistoryCardProps> = ({ answer }) => {
  return (
    <Card>
      <DateText>{answer.date}</DateText>
      <ContentText>{answer.content}</ContentText>
      <BottomBox>
        <TimeText>{answer.time}</TimeText>
        <ButtonGroup>
          <MultiCaption type="오답-top" />
          <MultiCaption type="이해완료" />
        </ButtonGroup>
      </BottomBox>
    </Card>
  );
};

export default HistoryCard;

const Card = styled.div`
  width: 264px;
  height: 154px;
  margin-bottom: 12px;
  box-sizing: border-box;
  padding: 20px 30px;
  background-color: #ffffff;
  border-radius: 16px;
`;

const DateText = styled.div`
  color: #747474;
  font-size: 15px;
  font-weight: 600;
  line-height: 150%;
  margin-bottom: 12px;
`;

const ContentText = styled.div`
  overflow: hidden;
  color: #000;
  text-overflow: ellipsis;
  font-size: 16px;
  font-weight: 600;
  line-height: 150%;
  margin-bottom: 8px;
`;

const BottomBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TimeText = styled.div`
  color: #afafaf;
  font-size: 15px;
  font-weight: 600;
  line-height: 150%;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 4px;
`;
