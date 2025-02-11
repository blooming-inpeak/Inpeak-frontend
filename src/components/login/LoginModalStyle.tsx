import styled from 'styled-components';

export const LoginModalContainer = styled.div`
  width: 504px;
  height: 539px;
  padding: 20px 24px 80px 24px;
  background-color: #ffffff;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  border-radius: 24px;

  box-shadow: 0px 0px 24px 0px rgba(50, 59, 84, 0.24);
`;

export const CloseButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;

  img {
    width: 24px;
    height: 24px;

    cursor: pointer;
  }
`;

export const LoginHeader = styled.div`
  width: 100%;
  height: 343px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const LoginTitle = styled.div`
  font-size: 32px;
  font-weight: 700;
  line-height: 150%;
  letter-spacing: -0.16px;
  color: #3277ed;
`;

export const LoginBanner = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
`;

export const LoginFooter = styled.div`
  width: 330px;
  height: 132px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  gap: 40px;
`;

export const LoginKakaotalk = styled.div`
  width: 330px;
  height: 50px;

  border-radius: 8px;
  background-color: #ffe812;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

export const KaKaoTalkTitle = styled.span`
  color: '#212121';
  font-size: 15px;
  font-weight: 600;
  line-height: 150%;
`;

export const LoginTerms = styled.div`
  width: 250px;
  color: #212121;

  font-size: 14px;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.35px;

  text-align: center;
`;
