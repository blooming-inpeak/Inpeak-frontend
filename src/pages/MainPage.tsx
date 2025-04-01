import styled from 'styled-components';
import { MainIntro } from '../components/mainpage/intro/MainIntro';
import { MainInterest } from '../components/mainpage/interest/MainInterest';
import { MainInterview } from '../components/mainpage/interview/MainInterview';
import { MainFeedback } from '../components/mainpage/feedback/MainFeedback';
import { MainHistory } from '../components/mainpage/history/MainHistory';
import { MainInterviewStart } from '../components/mainpage/interviewStart/MainInterviewStart';
import { MainHelp } from '../components/mainpage/help/MainHelp';
import Footer from '../components/common/Footer/Footer';

export const MainPage = () => {
  return (
    <MainPageWrapper>
      <MainIntro />
      <MainInterest />
      <MainInterview />
      <MainFeedback />
      <MainHistory />
      <MainInterviewStart />
      <MainHelp />
      <Footer />
      <MainPageDottedLine src="/images/mainpage/Dotted_line.svg" alt="dotted line" />
    </MainPageWrapper>
  );
};

export const MainPageWrapper = styled.div`
  height: auto;
  width: 100vw;
  overflow: scroll;
  position: absolute;
  top: 0;

  display: flex;
  flex-direction: column;
  background-color: #fafafa;
`;

export const MainPageDottedLine = styled.img`
  width: 123px;
  height: 3526px;

  position: absolute;
  left: 50%;
  top: 1400px;
`;
