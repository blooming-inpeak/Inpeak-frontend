import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const MainIntroTop = () => {
  const navigate = useNavigate();
  return (
    <MainIntroTopWrapper>
      <MainIntroTopBox>개발자 기술면접도 실전연습 할 수 없을까..?</MainIntroTopBox>

      <MainIntroTopContent>
        모의면접 연습하기부터 AI피드백까지
        <br />
        인픽에서 기술면접 완벽 대비
      </MainIntroTopContent>

      <MainIntroTopButton onClick={() => navigate('/interview')}>
        <div></div>
        <MainIntroTopButtonText>나의 기술면접 실력 체크하기</MainIntroTopButtonText>
        <img src="/images/chevron/Chevron_right_white.svg" alt="Chevron_right_white" />
      </MainIntroTopButton>
    </MainIntroTopWrapper>
  );
};

export const MainIntroTopWrapper = styled.div`
  width: 100%;
  height: auto;
  padding-top: 40px;
  z-index: 2;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-top: 65px;
  position: relative;
`;

export const MainIntroTopBox = styled.div`
  width: 332px;
  height: 52px;

  display: flex;
  transform: rotate(-5.482deg);
  justify-content: center;
  align-items: center;

  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0px 8px 24px 0px rgba(0, 80, 216, 0.04);
  backdrop-filter: blur(10px);

  color: #212121;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0/4px;
`;

export const MainIntroTopContent = styled.div`
  color: #212121;
  text-align: center;
  font-size: 32px;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.16px;

  margin-top: 12px;
`;

export const MainIntroTopButton = styled.div`
  width: 223px;
  height: 36px;
  padding: 6px 18px;

  margin-top: 14px;
  gap: 4px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 100px;
  background-color: #202a43;

  cursor: pointer;
  &:hover {
    background-color: #464f69;
  }
`;

export const MainIntroTopButtonText = styled.div`
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.35px;
`;
