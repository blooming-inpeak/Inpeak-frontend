import { useCallback, useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { userState } from '../../store/auth/userState';
import { redirectAfterLoginState } from '../../store/auth/redirectAfterLoginState';
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
  PolicyLink,
} from './LoginModalStyle';
import { PrivacyPolicyModal } from '../common/policy/Policy';
import { BlurBackground } from '../common/background/BlurBackground';

import closeIcon from '../../assets/img/Close.svg';
import logoImg from '../../assets/img/Logo.svg';
import loginBanner from '../../assets/img/login/illustration_login.svg';
import kakaoIcon from '../../assets/img/login/KakaoTalk.svg';

interface Props {
  setOpenLogin: (value: boolean) => void;
}

const OAUTH_URL = 'https://api.inpeak.kr/oauth2/authorization/kakao';

export const LoginModal = ({ setOpenLogin }: Props) => {
  const [isPolicy, setIsPolicy] = useState('');
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const setRedirectAfterLogin = useSetRecoilState(redirectAfterLoginState);

  const onClickClose = useCallback(() => setOpenLogin(false), [setOpenLogin]);
  const onClickPrivacy = useCallback(() => setIsPolicy('privacy'), []);
  const onClickService = useCallback(() => setIsPolicy('service'), []);

  const handleKakaoLogin = useCallback(() => {
    localStorage.setItem('redirectAfterLogin', window.location.pathname);
    window.location.href = OAUTH_URL;
  }, []);

  // 로그인 완료 후 리다이렉트 처리
  useEffect(() => {
    if (user) {
      const redirect = localStorage.getItem('redirectAfterLogin') || '/';
      navigate(redirect, { replace: true });

      // 초기화
      localStorage.removeItem('redirectAfterLogin');
      setRedirectAfterLogin(null);
      setOpenLogin(false);
    }
  }, [user, navigate, setRedirectAfterLogin, setOpenLogin]);

  useEffect(() => {
    const preloadImage = (src: string) =>
      new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve();
        img.onerror = () => reject();
      });

    const loadAllImages = async () => {
      try {
        await Promise.all([closeIcon, logoImg, loginBanner, kakaoIcon].map(preloadImage));
        setIsReady(true);
      } catch (err) {
        console.warn('이미지 로딩 실패', err);
        setIsReady(true);
      }
    };

    loadAllImages();
  }, []);

  if (!isReady) return null;

  return (
    <BlurBackground>
      <LoginModalContainer>
        <CloseButton onClick={onClickClose}>
          <img src={closeIcon} alt="close" />
        </CloseButton>
        <LoginHeader>
          <LoginTitle src={logoImg} alt="logo" />
          <LoginBanner src={loginBanner} alt="로그인 이미지" />
        </LoginHeader>
        <LoginFooter>
          <LoginKakaotalk onClick={handleKakaoLogin}>
            <img src={kakaoIcon} alt="kakaotalk" width={17} />
            <KaKaoTalkTitle>카카오로 로그인/회원가입</KaKaoTalkTitle>
          </LoginKakaotalk>
          <LoginTerms>
            로그인 시 <PolicyLink onClick={onClickPrivacy}>개인정보처리방침 </PolicyLink> 및{' '}
            <PolicyLink onClick={onClickService}>서비스 약관</PolicyLink>을 준수하고
            <br /> 동의하는 것으로 간주합니다.
          </LoginTerms>
        </LoginFooter>
      </LoginModalContainer>

      {isPolicy && <PrivacyPolicyModal onClose={() => setIsPolicy('')} isPolicy={isPolicy} />}
    </BlurBackground>
  );
};
