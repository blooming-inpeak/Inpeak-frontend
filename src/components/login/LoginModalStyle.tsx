import styled from 'styled-components';

export const LoginModalContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 463px;
  padding: 24px 24px 40px 24px;
  border-radius: 24px;
  background: #fff;
  box-shadow: 0 0 24px rgba(50, 59, 84, 0.24);
  box-sizing: border-box;
`;

export const CloseButton = styled.button`
  padding: 0%;
  align-self: flex-start;
  cursor: pointer;
  margin-bottom: 10px;
  img {
    width: 100%;
    height: 100%;
  }
`;

export const LoginHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 26.01px;
`;

export const LoginTitle = styled.img`
  width: 100px;
  height: auto;
  margin-bottom: 20px;
`;

export const LoginBanner = styled.img`
  object-fit: contain;
`;

export const LoginFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

export const LoginKakaotalk = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fee500;
  width: 100%;
  max-width: 330px;
  height: 40px;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export const KaKaoTalkTitle = styled.span`
  margin-left: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #000;
`;

export const LoginTerms = styled.div`
  font-size: 12px;
  text-align: center;
  color: #666;
  margin: 0;
  line-height: 1.5;

  span {
    color: #0050d8;
    cursor: pointer;
  }
`;

export const PolicyLink = styled.span`
  color: #0050d8;
  cursor: pointer;
`;
