import styled from 'styled-components';

export const PrivacyWrapper = styled.div`
  width: 352px;
  height: 415px;
  padding: 24px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 24px;
  position: fixed;
  box-shadow: 0px 0px 24px 0px rgba(50, 59, 84, 0.24);
`;

export const PrivacyTop = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  height: 24px;

  cursor: pointer;

  margin-bottom: 20px;
`;
export const PrivacyTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 150%;
`;

export const Space = styled.div`
  width: 24px;
  height: 24px;
`;

export const PrivacyContent = styled.pre`
  width: 320px;
  height: 100%;

  display: flex;
  padding: 10px;

  border-radius: 4px;
  border: 1px solid #e6e6e6;
  margin: 0 0 30px 0;

  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    transition: backgroun-color 0.3s;
  }
  &:hover::-webkit-scrollbar-thumb {
    background-color: #c3daff;
    border-radius: 100px;
  }

  color: #212121;
  font-size: 12px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.3px;
  word-spacing: -3px;

  white-space: pre-wrap;
  word-wrap: break-word;
`;

export const PrivacyFooter = styled.div`
  width: 100%;
  height: 36px;

  display: flex;
  justify-content: flex-end;
`;

export const PrivacytFooterButton = styled.div`
  width: 37px;
  height: 24px;

  padding: 2px 10px;
  border-radius: 100px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #3277ed;

  font-size: 12px;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.3px;
  color: #ffffff;

  &:hover {
    background-color: #72a6ff;
  }
  cursor: pointer;
`;
