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
  position: absolute;
  top: 0;

  display: flex;
  flex-direction: column;
  background-color: #fafafa;
`;
