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

export const MyPageTop = () => {
  return (
    <MyPageTopWrapper>
      <MyPageProfile src="/images/profile.png" alt="profile" />

      <MyPageInfo>
        <MyPageInfoTop>
          <Space></Space>
          <MyPageName>김인픽</MyPageName>
          <EditIcon src="/images/Edit.svg" />
        </MyPageInfoTop>

        <MyPageInfoBottom>
          <MyPageKakaoTalk src="/images/KakaoTalkRound.svg" alt="kakaotalk" />
          <MyPageEmail>inpeak1234@email.com</MyPageEmail>
        </MyPageInfoBottom>
      </MyPageInfo>
    </MyPageTopWrapper>
  );
};
