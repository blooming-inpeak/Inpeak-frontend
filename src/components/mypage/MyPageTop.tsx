// src/components/mypage/MyPageTop.tsx
import { useState } from 'react';
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
import { useRecoilState } from 'recoil';
import { userState } from '../../store/auth/userState';

export const MyPageTop = () => {
  const [user] = useRecoilState(userState);
  const [isChange, setIsChange] = useState(false);

  if (!user) return null;

  const onChangeNickname = () => setIsChange(true);

  return (
    <MyPageTopWrapper>
      <MyPageProfile src="/images/profile.png" alt="profile" />
      <MyPageInfo>
        <MyPageInfoTop>
          <Space />
          <MyPageName>{user.nickname}</MyPageName>
          <EditIcon src="/images/Edit.svg" onClick={onChangeNickname} />
        </MyPageInfoTop>

        <MyPageInfoBottom>
          <MyPageKakaoTalk src="/images/KakaoTalkRound.svg" alt="kakaotalk" />
          <MyPageEmail>{user.kakaoemail}</MyPageEmail>
        </MyPageInfoBottom>
      </MyPageInfo>

      {isChange && (
        <BlurBackground>
          <ChangeNickname close={() => setIsChange(false)} />
        </BlurBackground>
      )}
    </MyPageTopWrapper>
  );
};
