import styled from 'styled-components';

export const Strict = () => {
  return (
    <StrictWrapper>
      <StrictImage>
        <StrictImageTitle>연속 연습 스트릭</StrictImageTitle>
        <StrictImageContent></StrictImageContent>
      </StrictImage>

      <StrictDay>
        <StrictDayTitle>오늘 연습하면 11일 돌파</StrictDayTitle>
        <StrictDayContent>
          <StrictDayNumber data-content="10">10</StrictDayNumber>
          <StrictDayOne>일째</StrictDayOne>
        </StrictDayContent>
      </StrictDay>
    </StrictWrapper>
  );
};

export const StrictWrapper = styled.div`
  width: 376px;
  height: 144px;

  display: flex;
  justify-content: space-between;
  padding: 40px;
  align-items: center;

  border-radius: 24px;
  border: 1px solid #ffffff;
  background-color: #e6efff;
`;

export const StrictImage = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const StrictImageTitle = styled.div`
  display: flex;
  padding: 2px 6px;
  justify-content: center;
  align-items: center;

  border-radius: 8px;
  background-color: #85b2ff;

  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
  line-height: 150%;
`;

export const StrictImageContent = styled.div``;

export const StrictDay = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const StrictDayTitle = styled.div`
  color: #3277ed;
  font-size: 16px;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.4px;
`;

export const StrictDayContent = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 4px;
`;

export const StrictDayNumber = styled.div`
  color: #ffffff;
  font-size: 96px;
  font-weight: 900;
  line-height: 100%;
  letter-spacing: -2.4px;
  position: relative;
  z-index: 1;

  &::before {
    content: attr(data-content);
    position: absolute;
    z-index: -1;
    -webkit-text-stroke: 20px #327eed;
  }
`;

export const StrictDayOne = styled.div`
  color: #3277ed;

  font-size: 20px;
  font-weight: 600;
  line-height: 150%;
`;
