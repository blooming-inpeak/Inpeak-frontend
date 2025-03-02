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

export const MyPageTop = () => {
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
          <MyPageName>김인픽</MyPageName>
          <EditIcon src="/images/Edit.svg" onClick={onChangeNickname} />
        </MyPageInfoTop>

        <MyPageInfoBottom>
          <MyPageKakaoTalk src="/images/KakaoTalkRound.svg" alt="kakaotalk" />
          <MyPageEmail>inpeak1234@email.com</MyPageEmail>
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
