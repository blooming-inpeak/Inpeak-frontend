import styled from 'styled-components';
import { BeforeVideo } from './BeforeVideo';
import { Buttons } from './Buttons';

export const SessionContent = () => {
  return (
    <SessionContentWrapper>
      <SessionContentNumber>1/3</SessionContentNumber>
      <SessionContentBody>
        <SessionContentAsk>
          <BackgroundImage src="/images/Comment.svg" alt="comment" />
          <SessionQuestion>사용자 중심 디자인에 대한 김인픽님의 접근 방식을 설명해 주시겠어요?</SessionQuestion>
        </SessionContentAsk>

        <BeforeVideo />

        <Buttons />
      </SessionContentBody>
    </SessionContentWrapper>
  );
};

export const SessionContentWrapper = styled.div`
  width: 100%;
  height: 100%;

  border-radius: 0 0 24px 24px;
  display: flex;
  flex-direction: column;
`;

export const SessionContentNumber = styled.div`
  width: 32.3px;
  height: 32.3px;

  border-radius: 8px;
  border: 1px solid #e6e6e6;
  background-color: #ffffff;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #707991;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.35px;

  margin-top: 19.74px;
  margin-left: 16.13px;
`;

export const SessionContentBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-top: 31px;
  width: 100%;
`;

export const SessionContentAsk = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative; /* 내부 요소 배치용 */
`;

export const BackgroundImage = styled.img`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1; /* 배경처럼 뒤로 보내기 */
`;

export const SessionQuestion = styled.p`
  padding: 24px;
  text-align: center;
  position: relative; /* 텍스트가 이미지 위에 오도록 설정 */
`;
