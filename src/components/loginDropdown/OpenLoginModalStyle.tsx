import styled from 'styled-components';

export const OpenLoginModalWrapper = styled.div`
  position: absolute;
  top: 100%;
  width: 190px;
  height: 156px;
  display: flex;
  flex-direction: column;

  border-radius: 0 0 12px 12px;
  background-color: #ffffff;
  overflow: hidden;
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
  align-items: center;
`;

export const OpenLoginModalMenu = styled.div`
  padding: 6px 20px;
  width: 162px;
  display: flex;

  color: #707991;
  font-size: 14px;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: -0.35px;

  &:hover {
    background-color: #eff5ff;
  }

  cursor: pointer;
`;

export const Divide = styled.div`
  width: 162px;
  height: 1px;
  margin: 6px 20px;

  background-color: #e6efff;
`;
