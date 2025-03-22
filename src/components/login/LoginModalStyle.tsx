import styled from 'styled-components';

/** 모달 전체 컨테이너 */
export const LoginModalContainer = styled.div`
  position: relative;
  display: flex;
  width: 400px;
  height: 463px;
  padding: 24px 24px 40px 24px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  aspect-ratio: 400/463;
  border-radius: 24px;
  background: #fff;
  box-shadow: 0px 0px 24px 0px rgba(50, 59, 84, 0.24);
`;

/** 닫기 버튼(모서리에 위치) */
export const CloseButton = styled.div`
  position: absolute;
  top: 24px;
  left: 24px;
  width: 24px;
  height: 24px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }
`;

/** 헤더(로고, 배너 이미지 등) */
export const LoginHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

/** 로고 이미지 */
export const LoginTitle = styled.img`
  width: 100px;
  height: auto;
  margin-bottom: 20px;
`;

/** 배너(새 이미지나 텍스트 등) */
export const LoginBanner = styled.img`
  width: 200px;
  height: auto;
`;

/** 푸터(카카오 로그인 버튼, 약관 문구 등) */
export const LoginFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

/** 카카오 로그인 버튼 */
export const LoginKakaotalk = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fee500;
  width: 330px;
  height: 40px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 16px;

  &:hover {
    opacity: 0.9;
  }
`;

/** 카카오 버튼 안의 텍스트 */
export const KaKaoTalkTitle = styled.span`
  margin-left: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #000;
`;

/** 약관 안내 문구 */
export const LoginTerms = styled.p`
  font-size: 12px;
  line-height: 1.4;
  text-align: center;
  color: #666;
  margin: 0;
`;
