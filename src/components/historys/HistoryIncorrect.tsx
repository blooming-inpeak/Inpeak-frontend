import styled from 'styled-components';
import { SortDropdown } from '../common/dropdownlist/DropdownList';
import { useState } from 'react';
import HistoryCard from './HistoryCard';

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
  {
    id: 6,
    date: '2025 / 01 / 16',
    content: '사용자 중심 디자인에 대한 귀하의 접근 방식을 설명해 주시겠...',
    time: '05:00',
  },
  {
    id: 7,
    date: '2025 / 01 / 16',
    content: '사용자 중심 디자인에 대한 귀하의 접근 방식을 설명해 주시겠...',
    time: '05:00',
  },
  {
    id: 8,
    date: '2025 / 01 / 16',
    content: '사용자 중심 디자인에 대한 귀하의 접근 방식을 설명해 주시겠...',
    time: '05:00',
  },
  {
    id: 9,
    date: '2025 / 01 / 16',
    content: '사용자 중심 디자인에 대한 귀하의 접근 방식을 설명해 주시겠...',
    time: '05:00',
  },
  {
    id: 10,
    date: '2025 / 01 / 16',
    content: '사용자 중심 디자인에 대한 귀하의 접근 방식을 설명해 주시겠...',
    time: '05:00',
  },
];

const HistoryIncorrect: React.FC = () => {
  const [answers] = useState<AnswerData[]>(sampleAnswers);
  return (
    <IncorrectContainer>
      <IncorrectHeader>
        <IncorrectTitle>오답노트</IncorrectTitle>
        <IncorrectDropdown>
          <SortDropdown options={['최신순', '오래된 순']} defaultOption="최신순" />
          <SortDropdown
            options={['전체보기', '오답만 보기', '포기만 보기', '이해완료만 보기']}
            defaultOption="전체보기"
          />
        </IncorrectDropdown>
      </IncorrectHeader>
      <ScrollContainer>
        {answers.map(answer => (
          <HistoryCard key={answer.id} answer={answer} />
        ))}
      </ScrollContainer>
    </IncorrectContainer>
  );
};

export default HistoryIncorrect;

const IncorrectContainer = styled.div`
  display: flex;
  width: 636px;
  height: 800px;
  flex-direction: column;
  border-radius: 24px;
  border: 1px solid #fff;
  background: #f5f9ff;
`;
const IncorrectHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 42px 42px 18px 42px;
`;
const IncorrectTitle = styled.div`
  color: #212121;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  letter-spacing: -0.12px;
`;
const IncorrectDropdown = styled.div`
  display: flex;
  gap: 4px;
`;

const ScrollContainer = styled.div`
  height: 704px;
  overflow-y: scroll;
  display: grid;
  grid-template-columns: repeat(2, 264px);
  column-gap: 24px;
  row-gap: 12px;
  padding: 0 42px 42px 42px;
  justify-content: start; /* 아이템들을 왼쪽 정렬로 고정 */
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
