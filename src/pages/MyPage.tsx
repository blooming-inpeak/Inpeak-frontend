import styled from 'styled-components';
import { MyPageTop } from '../components/mypage/MyPageTop';
import { MyPageBottom } from '../components/mypage/MyPageBottom';
import { useEffect, useState } from 'react';
import { GetMyPage } from '../api/getMyPage/GetMyPage';

interface UserInfo {
  nickname: string;
  kakaoEmail: string;
  interests: string[];
}

export const MyPage = () => {
  const [user, setUser] = useState<UserInfo | null>(null);
  useEffect(() => {
    const getUserInfo = async () => {
      const data = await GetMyPage();
      console.log(data);
      setUser(data);
    };

    getUserInfo();
  }, []);

  return (
    <MyPageWrapper>
      <MyPageContent>
        <MyPageTop userInfo={{ nickname: user?.nickname, kakaoEmail: user?.kakaoEmail }} />
        <MyPageBottom interests={user?.interests} />
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
