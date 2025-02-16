import styled from 'styled-components';

export const SessionContent = () => {
  return (
    <SessionContentWrapper>
      <SessionContentNumber>1/3</SessionContentNumber>
      <SessionContentBody>
        <SessionContentAsk>
          <img src="/images/Comment.svg" alt="comment" style={{ display: 'block', width: '100%', height: 'auto' }} />
          <SessionQuestion>사용자 중심 디자인에 대한 김인픽님의 접근 방식을 설명해 주시겠어요?</SessionQuestion>
        </SessionContentAsk>
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
  position: relative;
  display: inline-block;

  height: fit-content;
`;

export const SessionQuestion = styled.div`
  padding: 24px;
  color: #212121;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: -0.4px;
  text-align: center;

  position: absolute;
  top: 10%;
  left: 0;
  width: 100%;
  max-width: 100%;
  height: 100%;

  display: flex;
  box-sizing: border-box;
`;
