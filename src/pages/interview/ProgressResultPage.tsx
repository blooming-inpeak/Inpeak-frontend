import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SuccessStamp from '../../assets/img/SuccessStamp.svg';
import GiveupStamp from '../../assets/img/GiveupStamp.svg';
import { InterviewResult } from '../../components/InterviewResult/InterviewResult';
import { formatSecondsToTime } from '../../utils/format';
import { SessionCloseModal } from '../../components/session/SessionCloseModal';

export type Result = {
  interviewId: string;
  questionId: number;
  question: string;
  answerId?: number;
  taskId?: number;
  time: number;
  isAnswer: boolean;
};
export type ResultDataType = {
  question: string;
  time: string;
  status: 'success' | 'giveup';
};
type ResultItemProps = {
  index: number;
  item: Result;
};

export const ProgessResultPage: React.FC = () => {
  const [resultData, setResultData] = useState<Result[]>([]);
  const [totalTime, setTotalTime] = useState<string>('00:00');
  const [showResultModal, setShowResultModal] = useState<boolean>(false);
  const [showCloseModal, setShowCloseModal] = useState(false);

  const getResultStateFromStorage = (): Result[] => {
    try {
      const raw = localStorage.getItem('result');
      if (!raw) return [];
      return JSON.parse(raw);
    } catch {
      return [];
    }
  };

  useEffect(() => {
    const stored = getResultStateFromStorage();
    setResultData(stored);
    const totalSeconds = stored.reduce((acc, curr) => acc + curr.time, 0);
    setTotalTime(formatSecondsToTime(totalSeconds));
  }, []);
  // const mockResult = [
  //   {
  //     questionId: 5,
  //     question: '자기소개 해주세요',
  //     time: 25,
  //     isAnswer: true,
  //     taskId: 777, // WAITING후 실패
  //   },
  //   {
  //     questionId: 1,
  //     question: '자기소개 해주세요',
  //     time: 25,
  //     isAnswer: true,
  //     taskId: 111, // WAITING 고정 (계속 로딩 상태)
  //   },
  //   {
  //     questionId: 2,
  //     question: '지원 동기를 말씀해주세요',
  //     time: 30,
  //     isAnswer: true,
  //     taskId: 222, // SUCCESS 즉시 → answerId: 999
  //   },
  //   {
  //     questionId: 3,
  //     question: '최근에 읽은 책에 대해 이야기해주세요',
  //     time: 20,
  //     isAnswer: true,
  //     taskId: 333, // FAILED → 에러 메시지 보여주기
  //   },
  //   {
  //     questionId: 4,
  //     question: '자기2',
  //     time: 25,
  //     isAnswer: true,
  //     taskId: 999,
  //   },
  // ];
  return (
    <>
      {showResultModal && (
        <InterviewResult result={resultData} onClose={() => setShowResultModal(false)} isAfterInterview />
      )}

      <ResultPageWrapper>
        <ResultPageContainer>
          <ResultTop>
            <CloseBtn onClick={() => setShowCloseModal(true)}>닫기</CloseBtn>
          </ResultTop>
          {showCloseModal && <SessionCloseModal onClose={() => setShowCloseModal(false)} />}
          <ResultMain>
            <ResultmainTop>
              <div id="resultTitle">
                <h1>모의 면접이 종료되었습니다</h1>
                <h2>AI를 통해 세부 피드백을 받아보세요</h2>
              </div>
              <div id="resultTime">
                <h2>총 답변시간</h2>
                <h1>{totalTime}</h1>
              </div>
            </ResultmainTop>
            <ResultmainBottom>
              <ResultList>
                {resultData.map((item, index) => (
                  <React.Fragment key={index}>
                    <ResultItem index={index} item={item} />
                    {index < resultData.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </ResultList>
            </ResultmainBottom>
          </ResultMain>
          <ResultFeedbackButton onClick={() => setShowResultModal(true)}>AI 피드백 받기</ResultFeedbackButton>
        </ResultPageContainer>
      </ResultPageWrapper>
    </>
  );
};

const getStampImage = (status: 'success' | 'giveup') => (status === 'success' ? SuccessStamp : GiveupStamp);

const ResultItem: React.FC<ResultItemProps> = ({ index, item: { question, time, isAnswer } }) => {
  const status = isAnswer ? 'success' : 'giveup';
  return (
    <div className="resultList">
      <h1>Q{index + 1}</h1>
      <div id="resultListContent">
        <h2>{question}</h2>
        <h3>{formatSecondsToTime(time)}</h3>
      </div>
      <img src={getStampImage(status)} alt={status} />
    </div>
  );
};

const ResultPageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
`;

const ResultPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 710px;
  border-radius: 24px;
  box-shadow:
    100px 100px 100px 0px rgba(0, 0, 0, 0.02),
    2px 4px 4px 0px rgba(255, 255, 255, 0.24) inset,
    0px 0px 100px 0px rgba(0, 80, 216, 0.08);
  padding-bottom: 48px;
`;

const ResultTop = styled.div`
  display: flex;
  width: 710px;
  height: 48px;
  border-radius: 24px 24px 0px 0px;
  background: #323b54;
`;
const CloseBtn = styled.button`
  width: 40px;
  height: 25px;
  border: 1px solid #afafaf;
  border-radius: 10px;
  color: #fff;
  margin-top: 12px;
  margin-left: 12px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.typography.button2}
`;
const ResultMain = styled.div`
  width: 710px;
  border-radius: 0px 0px 24px 24px;
  background: #fff;
  display: flex;
  flex-direction: column;
`;

const ResultmainTop = styled.div`
  display: flex;
  margin-left: 85px;
  margin-top: 60px;
  margin-bottom: 57.59px;

  #resultTitle h1 {
    color: #3277ed;
    font-size: 28px;
    font-weight: 700;
    margin: 0;
  }

  #resultTitle h2 {
    color: #747474;
    font-size: 16px;
    font-weight: 600;
    margin: 0;
  }

  #resultTime {
    display: flex;
    padding: 20px 30px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    border: 1px solid #e6efff;
    background: #fbfdff;
    margin-left: 121px;
  }

  #resultTime h2 {
    color: #212121;
    font-size: 14px;
    font-weight: 500;
    margin: 0;
  }

  #resultTime h1 {
    color: #212121;
    font-size: 18px;
    font-weight: 600;
    margin: 0;
  }
`;

const ResultmainBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ResultList = styled.div`
  display: flex;
  flex-direction: column;

  .resultList {
    display: flex;
    width: 532px;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
    gap: 10px;

    h1 {
      color: #212121;
      font-size: 24px;
      font-weight: 700;
      margin: 0;
    }

    #resultListContent {
      flex: 1;
      margin-left: 10px;

      h2 {
        color: #212121;
        font-size: 14px;
        font-weight: 400;
        margin: 0;
        margin-bottom: 2px;
      }

      h3 {
        color: #747474;
        font-size: 12px;
        font-weight: 500;
        margin: 0;
      }
    }

    img {
      width: 60px;
      height: 56.203px;
      aspect-ratio: 60/56.2;
    }
  }
`;

const Divider = styled.div`
  width: 500px;
  height: 1px;
  background-color: #e0e0e0;
  margin: 10px auto;
`;

const ResultFeedbackButton = styled.button`
  width: 309px;
  height: 44px;
  border-radius: 100px;
  background: #202a43;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
  align-self: center;
  margin-top: 40px;

  &:hover {
    background: rgb(13, 17, 27);
  }
`;
