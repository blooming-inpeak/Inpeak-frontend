import { useState } from 'react';
import {
  CloseButton,
  KaKaoTalkTitle,
  LoginBanner,
  LoginFooter,
  LoginHeader,
  LoginKakaotalk,
  LoginModalContainer,
  LoginTerms,
  LoginTitle,
} from './LoginModalStyle';
import { PrivacyPolicyModal } from './Policy';

interface Props {
  setOpenLogin: (value: boolean) => void;
}

export const LoginModal = ({ setOpenLogin }: Props) => {
  const [isPolicy, setIsPolicy] = useState('');

  const onClickClose = () => {
    setOpenLogin(false);
  };

  const onClickPrivacy = () => {
    setIsPolicy('privacy');
  };

  const onClickService = () => {
    setIsPolicy('service');
  };

  return (
    <>
      <LoginModalContainer>
        <CloseButton>
          <img src="/images/Close.svg" alt="close" onClick={onClickClose} />
        </CloseButton>
        <LoginHeader>
          <LoginTitle src="/images/Logo.svg" />
          <LoginBanner>사진</LoginBanner>
        </LoginHeader>

        <LoginFooter>
          <LoginKakaotalk>
            <img src="/images/KakaoTalk.svg" alt="kakaotalk" style={{ width: '17px', fill: '#212121' }} />
            <KaKaoTalkTitle>카카오로 로그인/회원가입</KaKaoTalkTitle>
          </LoginKakaotalk>
          <LoginTerms>
            로그인 시{' '}
            <span style={{ color: '#0050d8', cursor: 'pointer' }} onClick={onClickPrivacy}>
              개인정보처리방침
            </span>{' '}
            및{' '}
            <span style={{ color: '#0050d8', cursor: 'pointer' }} onClick={onClickService}>
              서비스 약관
            </span>
            을 준수하고 동의하는 것으로 간주합니다.
          </LoginTerms>
        </LoginFooter>
      </LoginModalContainer>
      {isPolicy && <PrivacyPolicyModal onClose={() => setIsPolicy('')} isPolicy={isPolicy} />}
    </>
  );
};
