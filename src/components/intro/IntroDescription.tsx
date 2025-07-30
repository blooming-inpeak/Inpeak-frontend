import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const IntroDescription = () => {
  const navigate = useNavigate();

  const onClickClose = () => {
    navigate('/interview');
  };
  return (
    <IntroDescriptionWrapper>
      <img
        src="/images/Close_white.svg"
        alt="close"
        style={{ width: '24px', cursor: 'pointer' }}
        onClick={onClickClose}
      />

      <IntroContent>
        <IntroTitle>한 질문에 5분씩 주어집니다</IntroTitle>
        <IntroSubTitle>화면과 마이크를 조정하고 시작하기를 클릭해보세요</IntroSubTitle>
      </IntroContent>
    </IntroDescriptionWrapper>
  );
};

export const IntroDescriptionWrapper = styled.div`
  width: 250px;
  height: 564px;
  padding: 24px;

  display: flex;
  flex-direction: column;
  gap: 32px;

  border-radius: 24px 0 0 24px;
  background-color: #323b54;
`;

export const IntroContent = styled.div`
  display: flex;
  flex-direction: column;

  width: 190px;
  height: 150px;
  padding-left: 12px;

  gap: 12px;
`;

export const IntroTitle = styled.div`
  color: #ffffff;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.14px;
  line-height: 150%;
`;

export const IntroSubTitle = styled.div`
  color: #ffffff;

  font-size: 18px;
  font-weight: 600;
  line-height: 150%;
`;
