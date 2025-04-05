import React, { useState } from 'react';
import {
  EditIcon,
  MyPageEmail,
  MyPageInfo,
  MyPageInfoBottom,
  MyPageInfoTop,
  MyPageKakaoTalk,
  MyPageName,
  MyPageProfile,
  MyPageTopWrapper,
  Space,
} from './MyPageTopStyle';
import { BlurBackground } from '../common/background/BlurBackground';
import { ChangeNickname } from './ChangeNickname';
import { UserInfo } from '../../pages/MyPage';

interface Props {
  user: UserInfo;
  setUser: React.Dispatch<React.SetStateAction<UserInfo>>;
}

export const MyPageTop = ({ user, setUser }: Props) => {
  const [isChange, setIsChange] = useState(false);
  const onChangeNickname = () => {
    setIsChange(true);
  };
  return (
    <MyPageTopWrapper>
      <MyPageProfile src="/images/profile.png" alt="profile" />

      <MyPageInfo>
        <MyPageInfoTop>
          <Space></Space>
          <MyPageName>{user.nickname}</MyPageName>
          <EditIcon src="/images/Edit.svg" onClick={onChangeNickname} />
        </MyPageInfoTop>

        <MyPageInfoBottom>
          <MyPageKakaoTalk src="/images/KakaoTalkRound.svg" alt="kakaotalk" />
          <MyPageEmail>{user.kakaoEmail}</MyPageEmail>
        </MyPageInfoBottom>
      </MyPageInfo>

      {isChange && (
        <BlurBackground>
          <ChangeNickname close={() => setIsChange(false)} setUser={setUser} />
        </BlurBackground>
      )}
    </MyPageTopWrapper>
  );
};
