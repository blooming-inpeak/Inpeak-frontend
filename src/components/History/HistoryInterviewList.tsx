import React, { useState } from 'react';
import styled from 'styled-components';
import { SortDropdown } from '../common/dropdownlist/DropdownList';
import { MultiCaption } from '../common/caption/Caption';

interface AnswerData {
  id: number;
  date: string;
  content: string;
  time: string;
}

const sampleAnswers: AnswerData[] = [
  {
    id: 1,
    date: '2025 / 01 / 12',
    content: '사용자 중심 디자인에 대한 귀하의 접근 방식을 설명해 주시겠...',
    time: '01:25',
  },
  {
    id: 2,
    date: '2025 / 01 / 13',
    content: '사용자 중심 디자인에 대한 귀하의 접근 방식을 설명해 주시겠...',
    time: '02:10',
  },
  {
    id: 3,
    date: '2025 / 01 / 14',
    content: '사용자 중심 디자인에 대한 귀하의 접근 방식을 설명해 주시겠...',
    time: '03:45',
  },
  {
    id: 4,
    date: '2025 / 01 / 15',
    content: '사용자 중심 디자인에 대한 귀하의 접근 방식을 설명해 주시겠...',
    time: '04:20',
  },
  {
    id: 5,
    date: '2025 / 01 / 16',
    content: '사용자 중심 디자인에 대한 귀하의 접근 방식을 설명해 주시겠...',
    time: '05:00',
  },
];

const AnswerList: React.FC = () => {
  const [answers] = useState<AnswerData[]>(sampleAnswers);

  return (
    <Container>
      <Header>
        <Title>답변완료</Title>
        <div id="dropdownBox">
          <SortDropdown options={['최신순', '오래된 순']} defaultOption="최신순" />
          <SortDropdown
            options={['전체보기', '오답만 보기', '포기만 보기', '이해완료만 보기']}
            defaultOption="전체보기"
          />
        </div>
      </Header>
      <ScrollContainer>
        {answers.map(answer => (
          <Card key={answer.id}>
            <DateText>{answer.date}</DateText>
            <ContentText>{answer.content}</ContentText>
            <BottomBox>
              <TimeText>{answer.time}</TimeText>
              <ButtonGroup>
                <MultiCaption type={'오답-top'} />
                <MultiCaption type={'이해완료'} />
              </ButtonGroup>
            </BottomBox>
          </Card>
        ))}
      </ScrollContainer>
    </Container>
  );
};

export default AnswerList;

const Container = styled.div`
  display: flex;
  width: 348px;
  height: 800px;
  flex-direction: column;
  border-radius: 24px;
  border: 1px solid #fff;
  background: #f5f9ff;
  box-sizing: border-box;
  padding: 42px 42px 0px 42px;
`;

const Header = styled.div`
  display: flex;
  width: 264px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;

  #dropdownBox {
    display: flex;
    gap: 4px;
  }
`;

const Title = styled.span`
  color: #212121;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  letter-spacing: -0.12px;
  margin-right: 17px;
`;

const ScrollContainer = styled.div`
  height: 704px;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Card = styled.div`
  width: 264px;
  height: 154px;
  margin-bottom: 12px;
  box-sizing: border-box;
  padding: 20px 30px 20px 30px;
  background-color: #ffffff;
  border-radius: 16px;
`;

const DateText = styled.div`
  color: #747474;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  margin-bottom: 12px;
`;

const ContentText = styled.div`
  overflow: hidden;
  color: #000;
  text-overflow: ellipsis;
  font-size: 16px;
  font-style: normal;
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
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 4px;
`;
