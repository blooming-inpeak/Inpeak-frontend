import styled from 'styled-components';

export const MyPageTopWrapper = styled.div`
  width: 165px;
  height: 231px;

  gap: 20px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MyPageProfile = styled.img`
  width: 160px;
  height: 160px;
`;

export const MyPageInfo = styled.div`
  width: 165px;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MyPageInfoTop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
`;

export const Space = styled.div`
  width: 24px;
  height: 24px;
`;

export const MyPageName = styled.div`
  color: #212121;
  text-align: center;

  font-size: 20px;
  font-weight: 600;
  line-height: 150%;
`;

export const EditIcon = styled.img`
  width: 24px;
  cursor: pointer;
`;

export const MyPageInfoBottom = styled.div`
  width: 100%;

  display: flex;
  align-items: center;

  gap: 4px;
`;

export const MyPageKakaoTalk = styled.img`
  width: 18px;
  height: 18px;
`;

export const MyPageEmail = styled.div`
  color: #747474;
  text-align: center;

  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.35px;
`;
