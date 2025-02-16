import styled from 'styled-components';

export const MicLevel = () => {
  return (
    <MicLevelWrapper>
      <MicLevelComponent />
      <MicLevelComponent />
      <MicLevelComponent />
      <MicLevelComponent />
      <MicLevelComponent />
      <MicLevelComponent />
      <MicLevelComponent />
      <MicLevelComponent />
      <MicLevelComponent />
      <MicLevelComponent />
      <MicLevelComponent />
      <MicLevelComponent />
      <MicLevelComponent />
      <MicLevelComponent />
      <MicLevelComponent />
      <MicLevelComponent />
      <MicLevelComponent />
    </MicLevelWrapper>
  );
};

export const MicLevelWrapper = styled.div`
  display: flex;
  gap: 2px;
`;

export const MicLevelComponent = styled.div`
  width: 8px;
  height: 18px;
  border-radius: 4px;
  background-color: #e6efff;
`;
