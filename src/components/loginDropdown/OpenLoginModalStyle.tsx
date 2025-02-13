import styled from 'styled-components';

export const OpenLoginModalWrapper = styled.div`
  position: fixed;
  top: 19px;

  width: 150px;
  height: 130px;
  padding: 10px 20px 24px 20px;

  display: flex;
  flex-direction: column;
  gap: 20px;

  border-radius: 12px;
  background-color: #ffffff;
`;

export const OpenLoginModalTop = styled.div`
  width: 100%;
  height: 30px;

  display: flex;
  justify-content: space-between;
`;

export const OpenLoginModalProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const OpenLoginModalName = styled.div`
  color: #747474;

  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.35px;
`;

export const OpenLoginModalButton = styled.img`
  width: 16px;
  cursor: pointer;
`;

export const OpenLoginModalBottom = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const OpenLoginModalMenu = styled.div`
  color: #707991;
  font-size: 14px;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: -0.35px;

  cursor: pointer;
`;

export const Divide = styled.div`
  width: 100%;
  height: 1px;

  background-color: #eff2f6;
`;
