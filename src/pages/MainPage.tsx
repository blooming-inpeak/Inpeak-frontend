import styled from 'styled-components';
import { MainIntro } from '../components/mainpage/intro/MainIntro';

export const MainPage = () => {
  return (
    <MainPageWrapper>
      <MainIntro />
    </MainPageWrapper>
  );
};

export const MainPageWrapper = styled.div`
  height: auto;
  width: 100vw;
  overflow: scroll;

  display: flex;
  flex-direction: column;
`;
