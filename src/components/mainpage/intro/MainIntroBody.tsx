import styled from 'styled-components';

export const MainIntroBody = () => {
  return (
    <MainIntroBodyWrapper>
      <MainIntroBodyTop>
        <TopContent>
          <HeaderBubbleSection>
            <Bubble style={{ padding: '14px 56px' }}>
              내가 안다고 믿는 개발 지식
              <br /> 정말 '알고' 있는게 맞을까?
              <TopTail src="/images/mainpage/CommentTail.svg" alt="comment tail" />
            </Bubble>
          </HeaderBubbleSection>

          <BodyContent>
            <BodyContentSection>
              <img src="/images/mainpage/MainIntro1.svg" alt="people 1" />
              <BodyContentSectionText>
                발화습관을 확인하고픈 <br />
                취준생 송세모씨
              </BodyContentSectionText>
            </BodyContentSection>
            <BodyContentSection>
              <img src="/images/mainpage/MainIntro2.svg" alt="people 1" />
              <BodyContentSectionText>
                확실하게 준비하고싶은 <br />
                비전공자 윤동글씨
              </BodyContentSectionText>
            </BodyContentSection>
            <BodyContentSection>
              <img src="/images/mainpage/MainIntro3.svg" alt="people 1" />
              <BodyContentSectionText>
                문장 정리가 필요한 <br />
                이직준비자 문네모씨
              </BodyContentSectionText>
            </BodyContentSection>
          </BodyContent>

          <FooterContent>
            <Bubble>
              내 대답이 과연 믿음직하고 <br />
              설득력있게 들릴까?
              <BottomLeftTail src="/images/mainpage/CommentTail.svg" alt="comment tail" />
            </Bubble>
            <Bubble>
              아는건 많은데 조리있는 문장으로 <br />
              말하기가 힘들어
              <BottomRightTail src="/images/mainpage/CommentTail.svg" alt="comment tail" />
            </Bubble>
          </FooterContent>
        </TopContent>
      </MainIntroBodyTop>

      <MainIntroBodyFooter>
        <FooterTitle>이런 면접 고민은 나만의 고민일까요?</FooterTitle>
        <FooterSubTitle>
          인픽의 개발자, 디자이너들도 같은 어려움을 느꼈어요.
          <br />
          이런한 고민들을 함께 타파하고자 서비스를 개발했습니다.{' '}
        </FooterSubTitle>
      </MainIntroBodyFooter>
    </MainIntroBodyWrapper>
  );
};

export const MainIntroBodyWrapper = styled.div`
  width: 1232px;
  height: 1207px;

  border-radius: 24px;
  box-shadow: 0px 80px 32px 0px rgba(32, 42, 67, 0.04), 2px 4px 4px 0px rgba(255, 255, 255, 0.24) inset,
    0px 0px 100px 0px rgba(0, 80, 216, 0.08);
  overflow: hidden;

  display: flex;
  flex-direction: column;
`;

export const MainIntroBodyTop = styled.div`
  width: 100%;
  height: 557px;
  padding: 150px 0 100px 0;

  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TopContent = styled.div`
  width: 872px;
  height: 557px;

  display: flex;
  flex-direction: column;

  gap: 12px;
`;

export const HeaderBubbleSection = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Bubble = styled.div`
  padding: 14px 36px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #ffffff;
  text-align: center;

  border-radius: 100px;
  background-color: #3277ed;

  font-size: 20px;
  font-weight: 600;
  line-height: 150%;

  position: relative;
`;

export const TopTail = styled.img`
  position: absolute;
  top: 80px;
  left: 211px;
`;

export const BodyContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 30px;
  margin-top: 27px;
`;

export const BodyContentSection = styled.div`
  width: 231px;
  height: 303px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const BodyContentSectionText = styled.div`
  color: #212121;
  text-align: center;

  font-size: 20px;
  font-weight: 600;
  line-height: 150%;
`;

export const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 26px;
`;

export const BottomLeftTail = styled.img`
  position: absolute;
  left: 101px;
  bottom: 78.33px;
  transform: rotate(180deg);
`;

export const BottomRightTail = styled.img`
  position: absolute;
  left: 131px;
  bottom: 80.32px;
  transform: rotate(180deg);
`;

export const MainIntroBodyFooter = styled.div`
  height: 100%;
  width: 100%;

  border-top: 1px dashed #212121;
  background-color: #fafafa;

  padding-top: 130px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const FooterTitle = styled.div`
  color: #212121;
  text-align: center;

  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.14px;
`;

export const FooterSubTitle = styled.div`
  color: #212121;
  text-align: center;

  font-size: 18px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.45px;
`;
