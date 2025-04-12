import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
import { PrivacyPolicyModal } from '../common/policy/Policy';
import { BlurBackground } from '../common/background/BlurBackground';

interface Props {
  setOpenLogin: (value: boolean) => void;
}

const OAUTH_URL = 'https://api.inpeak.kr/oauth2/authorization/kakao';

export const LoginModal = ({ setOpenLogin }: Props) => {
  const [isPolicy, setIsPolicy] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const onClickClose = () => {
    setOpenLogin(false);
    navigate('/');
  };
  const onClickPrivacy = () => setIsPolicy('privacy');
  const onClickService = () => setIsPolicy('service');

  const handleKakaoLogin = () => {
    window.location.href = `${OAUTH_URL}`;
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get('status');

    if (status === 'NEED_MORE_INFO') {
      navigate('/?status=NEED_MORE_INFO');
      setOpenLogin(false);
    }
  }, [location.search, navigate, setOpenLogin]);

  return (
    <>
      <BlurBackground>
        <LoginModalContainer>
          <CloseButton onClick={onClickClose}>
            <img src="/images/Close.svg" alt="close" />
          </CloseButton>
          <LoginHeader>
            <LoginTitle src="/images/Logo.svg" alt="logo" />
            <LoginBanner src="/images/login/illustration_login.svg" alt="로그인 이미지" />
          </LoginHeader>
          <LoginFooter>
            <LoginKakaotalk onClick={handleKakaoLogin}>
              <img src="/images/KakaoTalk.svg" alt="kakaotalk" style={{ width: '17px' }} />
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
              을 준수하고
              <br /> 동의하는 것으로 간주합니다.
            </LoginTerms>
          </LoginFooter>
        </LoginModalContainer>

        {isPolicy && <PrivacyPolicyModal onClose={() => setIsPolicy('')} isPolicy={isPolicy} />}
      </BlurBackground>
    </>
  );
};
