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

import { useRecoilValue } from 'recoil';
import { userState } from '../../store/auth/userState';

export const MyPageTop = () => {
  const [isChange, setIsChange] = useState(false);
  const onChangeNickname = () => {
    setIsChange(true);
  };

  const user = useRecoilValue(userState);
  const nickname = user?.nickname || '닉네임 없음';
  const email = user?.email || '이메일 없음';

  return (
    <MyPageTopWrapper>
      <MyPageProfile src="/images/profile.png" alt="profile" />

      <MyPageInfo>
        <MyPageInfoTop>
          <Space></Space>
          <MyPageName>{nickname}</MyPageName>
          <EditIcon src="/images/Edit.svg" onClick={onChangeNickname} />
        </MyPageInfoTop>

        <MyPageInfoBottom>
          <MyPageKakaoTalk src="/images/KakaoTalkRound.svg" alt="kakaotalk" />
          <MyPageEmail>{email}</MyPageEmail>
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
