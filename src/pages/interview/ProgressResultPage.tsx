import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import loadingAnimationData from '../../../public/images/loading/loading.json';
import SuccessStamp from '../../assets/img/SuccessStamp.svg';
import GiveupStamp from '../../assets/img/GiveupStamp.svg';

type ResultDataType = {
  question: string;
  time: string;
  status: 'success' | 'giveup';
};

type ResultItemProps = {
  index: number;
  item: ResultDataType;
};

export const ProgessResultPage: React.FC = () => {
  const [resultData, setResultData] = useState<ResultDataType[]>([]);
  const [totalTime, setTotalTime] = useState<string>('00:00');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const mockData: ResultDataType[] = [
        {
          question: '사용자 중심 디자인에 대한 귀하의 접근 방식을 설명해 주시겠어요?',
          time: '03:45',
          status: 'success',
        },
        {
          question: '귀하가 사용하는 디자인 툴과 그 툴을 사용해 진행한 프로젝트에 대해 이야기해 주세요.',
          time: '02:10',
          status: 'giveup',
        },
        {
          question: '사용자 중심 디자인에 대한 귀하의 접근 방식을 설명해 주시겠어요?',
          time: '03:05',
          status: 'success',
        },
      ];
      setResultData(mockData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const calculateTotalTime = () => {
      const totalSeconds = resultData.reduce((acc, curr) => {
        const [minutes, seconds] = curr.time.split(':').map(Number);
        return acc + minutes * 60 + seconds;
      }, 0);

      const minutes = Math.floor(totalSeconds / 60)
        .toString()
        .padStart(2, '0');
      const seconds = (totalSeconds % 60).toString().padStart(2, '0');

      return `${minutes}:${seconds}`;
    };

    setTotalTime(calculateTotalTime());
  }, [resultData]);

  const handleFeedbackClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate('/interview/result');
    }, 5000);
  };

  return (
    <>
      <ResultPageWrapper>
        <ResultPageContainer>
          <ResultTop />
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
              <ResultFeedbackButton onClick={handleFeedbackClick}>AI 피드백 받기</ResultFeedbackButton>
            </ResultmainBottom>
          </ResultMain>
        </ResultPageContainer>
      </ResultPageWrapper>
      {isLoading && (
        <Overlay>
          <Lottie
            animationData={loadingAnimationData}
            loop={true}
            autoplay={true}
            style={{ width: '203px', height: '200px' }}
          />
          <ProgressBarContainer>
            <ProgressBar />
          </ProgressBarContainer>
        </Overlay>
      )}
    </>
  );
};

const ResultItem: React.FC<ResultItemProps> = ({ index, item }) => {
  const getStampImage = (status: string) => {
    if (status === 'success') return SuccessStamp;
    if (status === 'giveup') return GiveupStamp;
    return '';
  };

  return (
    <div className="resultList">
      <h1>Q{index + 1}</h1>
      <div id="resultListContent">
        <h2>{item.question}</h2>
        <h3>{item.time}</h3>
      </div>
      <img src={getStampImage(item.status)} alt={item.status} />
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
  width: 710px;
  border-radius: 24px;
  box-shadow:
    100px 100px 100px 0px rgba(0, 0, 0, 0.02),
    2px 4px 4px 0px rgba(255, 255, 255, 0.24) inset,
    0px 0px 100px 0px rgba(0, 80, 216, 0.08);
`;

const ResultTop = styled.div`
  display: flex;
  width: 710px;
  height: 48px;
  border-radius: 24px 24px 0px 0px;
  background: #323b54;
`;

const ResultMain = styled.div`
  width: 710px;
  min-height: 552px;
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
  margin: 10px 0;
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

const Overlay = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(255, 255, 255);
  justify-content: center;
  align-items: center;
  z-index: 999;
  gap: 42.5px;
`;

const ProgressBarContainer = styled.div`
  width: 470px;
  height: 10px;
  background: #ccc;
  border-radius: 10px;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  background: #85b2ff;
  height: 100%;
  animation: progressAnimation 5s linear forwards;

  @keyframes progressAnimation {
    from {
      width: 0%;
    }
    to {
      width: 100%;
    }
  }
`;
