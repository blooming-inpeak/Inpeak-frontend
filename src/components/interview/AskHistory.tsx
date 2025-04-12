import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ClassButton } from './ClassButton';
import { AskHistoryBox } from './AskHistoryBox';
import { AskHistoryMore } from './AskHistoryMore';
import { fetchRecentAnswers } from '../../api/interview/recentInterviewAPI';
import { CaptionType } from '../common/caption/CaptionType';

interface HistoryItem {
  interviewId: number;
  questionId: number;
  answerId: number;
  question: string;
  answer: string;
  status: CaptionType;
  detailUrl: string;
}

export const AskHistory: React.FC = () => {
  const [isSelect, setIsSelect] = useState<'전체' | '정답' | '오답' | '포기'>('전체');
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchHistory = async () => {
    setLoading(true);
    const statusParam =
      isSelect === '전체' ? 'ALL' : isSelect === '정답' ? 'CORRECT' : isSelect === '오답' ? 'INCORRECT' : 'SKIPPED';

    const response = await fetchRecentAnswers(statusParam);

    if (response.success && response.data) {
      const formattedData = response.data.map(item => ({
        interviewId: item.interviewId,
        questionId: item.questionId,
        answerId: item.answerId,
        question: item.questionContent,
        answer: item.answerContent || '',
        status: (item.answerStatus === 'CORRECT'
          ? '정답-small'
          : item.answerStatus === 'INCORRECT'
            ? '오답-small'
            : '포기-small') as CaptionType,
        detailUrl: `history/detail/${item.answerId}`,
      }));

      setHistoryItems(formattedData);
    } else {
      console.warn('❗ 최근 질문 히스토리 불러오기 실패:', response.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSelect]);

  return (
    <AskHistoryWrapper>
      <AskHistoryTitle>최근 질문 히스토리</AskHistoryTitle>
      {loading ? (
        <EmptyMessage>로딩 중...</EmptyMessage>
      ) : (
        <>
          {/* ✅ 필터 버튼은 항상 표시 */}
          <AskHistoryClass>
            <ClassButton name="전체" isSelect={isSelect === '전체'} setIsSelect={setIsSelect} />
            <ClassButton name="정답" isSelect={isSelect === '정답'} setIsSelect={setIsSelect} />
            <ClassButton name="오답" isSelect={isSelect === '오답'} setIsSelect={setIsSelect} />
            <ClassButton name="포기" isSelect={isSelect === '포기'} setIsSelect={setIsSelect} />
          </AskHistoryClass>

          {/* ✅ 데이터가 있을 때만 히스토리 리스트 렌더링 */}
          {historyItems.length > 0 ? (
            <>
              {historyItems.map(item => (
                <AskHistoryBox
                  key={item.answerId}
                  question={item.question}
                  answer={item.answer}
                  status={item.status}
                  detailUrl={item.detailUrl}
                />
              ))}
              {historyItems.length >= 3 && <AskHistoryMore />}
            </>
          ) : (
            // ✅ 데이터 없을 때 안내 메시지
            <EmptyMessage>
              <h1>아직 진행된 면접이 없어요</h1>
              <h2>모의면접 연습하고 히스토리를 쌓아나가 보세요!</h2>
            </EmptyMessage>
          )}
        </>
      )}
    </AskHistoryWrapper>
  );
};

export const AskHistoryWrapper = styled.div`
  width: 549px;
  height: 422px;
  padding: 40px 50px;
  border-radius: 24px;
  background-color: #ffffff;
  box-shadow: 0px 8px 24px 0px rgba(0, 80, 216, 0.04);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const AskHistoryTitle = styled.div`
  color: black;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 28px;
`;

export const AskHistoryClass = styled.div`
  display: flex;
  gap: 6px;
`;

export const EmptyMessage = styled.div`
  width: 100%;
  color: #9a9a9a;
  text-align: center;
  line-height: 150%;
  padding-top: 135px;

  h1 {
    font-size: 20px;
    font-weight: 600;
    margin: 0 0 5px;
  }
  h2 {
    font-size: 14px;
    font-weight: 400;
    letter-spacing: -0.35px;
    margin: 0;
  }
`;
