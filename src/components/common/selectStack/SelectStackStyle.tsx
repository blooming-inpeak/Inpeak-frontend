import styled from 'styled-components';

export const SelectStackWrapper = styled.div`
  width: 500px;
  height: 342px;

  display: flex;
  flex-direction: column;

  padding: 24px;
  border-radius: 24px;
  background-color: #ffffff;
  box-shadow: 0px 0px 24px 0px rgba(50, 59, 84, 0.24);
`;

export const SelectStackBody = styled.div`
  width: 452px;
  height: 268px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
`;

export const SelectStackContent = styled.div`
  width: 419px;
  height: 139px;

  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const SelectStackContentTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const SelectStackTitle = styled.div`
  color: #212121;

  font-size: 20px;
  font-weight: 600;
  line-height: 150%;
`;

export const SelectStackSubTitle = styled.div`
  color: #606060;

  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.35px;
`;

export const SelectStackContentBottom = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
`;

export const SelectStackButton = styled.div`
  width: 100px;
  height: 36px;
  padding: 6px 18px;
  border-radius: 100px;

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #3277ed;

  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.35px;

  &:hover {
    background-color: #72a6ff;
  }
  cursor: pointer;
`;

export const BackButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const BackButton = styled.img`
  width: 24px;
  cursor: pointer;
`;
