import styled from 'styled-components';
import { MyPageTop } from '../components/mypage/MyPageTop';
import { MyPageBottom } from '../components/mypage/MyPageBottom';
import { useRecoilValue } from 'recoil';
import { userState } from '../store/auth/userState';
import Footer from '../components/common/Footer/Footer';

export const MyPage = () => {
  const user = useRecoilValue(userState);

  if (!user) return <div>로그인이 필요합니다</div>;

  return (
    <MyPageWrapper>
      <MyPageContent>
        <MyPageTop />
        <MyPageBottom interests={user.interests} />
      </MyPageContent>
      <Footer />
    </MyPageWrapper>
  );
};

export const MyPageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const MyPageContent = styled.div`
  width: 400px;
  min-height: 1014px;
  gap: 100px;
  display: flex;
  flex-direction: column;

  align-items: center;
`;
