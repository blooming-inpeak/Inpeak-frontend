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
import { PrivacyPolicyModal } from './Policy';

interface Props {
  setOpenLogin: (value: boolean) => void;
}

const OAUTH_URL = 'https://inpeak.kr/oauth2/authorization/kakao';

export const LoginModal = ({ setOpenLogin }: Props) => {
  const [isPolicy, setIsPolicy] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const onClickClose = () => setOpenLogin(false);
  const onClickPrivacy = () => setIsPolicy('privacy');
  const onClickService = () => setIsPolicy('service');

  // 🔥 OAuth 로그인 버튼 클릭 시 호출되는 함수
  const handleKakaoLogin = () => {
    window.location.href = `${OAUTH_URL}?redirect_uri=http://localhost:5173/?status=NEED_MORE_INFO`;
  };

  // 🔥 최초 모달 렌더링 시 무조건 이동되지 않도록 코드 수정
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get('status');

    if (status === 'NEED_MORE_INFO') {
      navigate('/?status=NEED_MORE_INFO');
      setOpenLogin(false);
    }

    // 기존 회원은 별도의 이동 처리가 필요 없고, 쿠키만 확인해도 됨
    // 따라서 그 외의 경우는 아무 처리도 하지 않음
  }, [location.search, navigate, setOpenLogin]);

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
