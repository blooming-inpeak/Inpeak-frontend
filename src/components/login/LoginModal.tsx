import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

const OAUTH_URL = 'https://inpeak.kr/oauth2/authorization/kakao';

export const LoginModal = ({ setOpenLogin }: Props) => {
  const [isPolicy, setIsPolicy] = useState('');
  const navigate = useNavigate();

  const onClickClose = () => setOpenLogin(false);
  const onClickPrivacy = () => setIsPolicy('privacy');
  const onClickService = () => setIsPolicy('service');

  const handleKakaoLogin = () => {
    window.location.href = `${OAUTH_URL}?redirect_uri=http://localhost:5173/?status=NEED_MORE_INFO`;
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      fetch(`/login/oauth2/code/kakao?code=${code}`, {
        method: 'GET',
        credentials: 'include',
      })
        .then(res => {
          if (res.status === 488) {
            navigate('/?status=NEED_MORE_INFO');
          } else if (res.ok) {
            navigate('/');
          } else {
            throw new Error('로그인 실패');
          }
        })
        .catch(err => {
          console.error('로그인 처리 오류:', err);
          alert('로그인 처리 오류');
        })
        .finally(() => {
          setOpenLogin(false);
          window.history.replaceState({}, '', '/');
        });
    }
  }, [setOpenLogin, navigate]);

  return (
    <>
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
    </>
  );
};
