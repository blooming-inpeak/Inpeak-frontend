import styled from 'styled-components';

export const MainInterview = () => {
  return (
    <MainInterviewWrapper>
      <MainInterviewImage src="/images/mainpage/MainInterviewImg.svg" alt="Main Interview Image" />

      <MainInterviewContent>
        <MainInterviewTitle>모의면접 연습하기</MainInterviewTitle>
        <MainInterviewSubTitle>
          늘어나는 모의면접 연습 한만큼 <br />
          제대로 익히는 실전 감각
        </MainInterviewSubTitle>
      </MainInterviewContent>
    </MainInterviewWrapper>
  );
};

export const MainInterviewWrapper = styled.div`
  width: 100%;
  height: 800px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 80px;

  margin-bottom: 24px;

  background-color: #202a43;
  z-index: 1;
`;

export const MainInterviewImage = styled.img`
  width: 400px;
  height: 281px;
`;

export const MainInterviewContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 12px;
`;

export const MainInterviewTitle = styled.div`
  color: #c3daff;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.1px;
`;

export const MainInterviewSubTitle = styled.div`
  color: #ffffff;
  font-size: 30px;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.15px;
`;
