import styled from 'styled-components';
import React from 'react';
import Footer from '../components/common/Footer/Footer';
import { CommonButton } from '../components/common/button/CommonButton';

const Container = styled.div`
  width: 550px;
  margin: 100px auto 184px;
`;

const Title = styled.h1`
  ${({ theme }) => theme.typography.head5}
  text-align: left;
`;

const QuestionSection = styled.div`
  margin-bottom: 100px;
`;

const QuestionContainer = styled.div`
  width: 550px;
  height: 159px;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Question = styled.h2`
  ${({ theme }) => theme.typography.title2}
`;

const Answer = styled.p`
  ${({ theme }) => theme.typography.body3R}
  margin: 0 0 0 18px;
`;

const Divider = styled.div`
  width: 420px;
  height: 1px;
  background-color: #ededed;
  margin: 0 auto;
`;

const ContactSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const ContactPage = () => {
  const faqData = Array(4).fill({
    question: '모의면접 녹화영상이 다운로드가 안됩니다.',
    answer:
      '히스토리에서 원하는 모의면접의 개별 탭으로 들어가시면 영상 다운로드 버튼이 있습니다. 클릭시 내 컴퓨터의 다운로드 파일에 저장됩니다.',
  });

  return (
    <>
      <Container>
        <QuestionSection>
          <Title>자주 묻는 질문</Title>

          {faqData.map((faq, index) => (
            <React.Fragment key={index}>
              <QuestionContainer>
                <Question>{`${index + 1}. ${faq.question}`}</Question>
                <Answer>{faq.answer}</Answer>
              </QuestionContainer>
              {index < faqData.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </QuestionSection>

        <ContactSection>
          <CommonButton width={126} height={36} as="a" href="https://forms.gle/xKsTZSMDtCKw1AJY7">
            직접 문의하기
          </CommonButton>
        </ContactSection>
      </Container>
      <Footer />
    </>
  );
};
