import styled from 'styled-components';
import { MyPageTop } from '../components/mypage/MyPageTop';
import { MyPageBottom } from '../components/mypage/MyPageBottom';

export const MyPage = () => {
  return (
    <MyPageWrapper>
      <MyPageContent>
        <MyPageTop />
        <MyPageBottom />
      </MyPageContent>
    </MyPageWrapper>
  );
};

export const MyPageWrapper = styled.div`
  width: 100%;
  height: 100%;

  padding-top: 100px;

  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

export const MyPageContent = styled.div`
  width: 400px;
  height: 603px;

  gap: 100px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
