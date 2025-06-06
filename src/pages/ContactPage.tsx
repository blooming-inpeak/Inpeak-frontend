import styled from 'styled-components';
import React from 'react';
import Footer from '../components/common/Footer/Footer';

const Container = styled.div`
  width: 550px;
  margin: 100px auto;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  line-height: 150%;
  text-align: left;
`;

const QuestionSection = styled.div`
  margin-bottom: 110px;
`;

const QuestionContainer = styled.div`
  width: 550px;
  height: 119px;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Question = styled.h2`
  font-size: 18px;
  font-weight: 600;
  line-height: 150%;
`;

const Answer = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.35px;

  margin: 0 0 0 18px;
`;

const Divider = styled.div`
  width: 420px;
  height: 1px;
  background-color: #ededed;
  margin: 0 auto;
`;

const EmailSection = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const EmailAddress = styled.button`
  all: unset;
  cursor: pointer;
  margin: 0;
  display: flex;
  padding: 6px 18px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: 100px;
  background: var(--brand-main, #3277ed);
  color: white;
  width: 94px;
  height: 24px;
  color: var(--text-1700, #fff);
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.35px;
`;

export const ContactPage = () => {
  const faqData = Array(4).fill({
    question: '모의면접 녹화영상이 다운로드가 안됩니다.',
    answer:
      '히스토리에서 원하는 모의면접의 개별 탭으로 들어가시면 영상 다운로드 버튼이 있습니다. 클릭시 내 컴퓨터의 다운로드 파일에 저장됩니다.',
  });

  return (
    <>
      {' '}
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

        <EmailSection>
          <EmailAddress as="a" href="https://forms.gle/xKsTZSMDtCKw1AJY7">
            직접 문의하기
          </EmailAddress>
        </EmailSection>
      </Container>
      <Footer />
    </>
  );
};
