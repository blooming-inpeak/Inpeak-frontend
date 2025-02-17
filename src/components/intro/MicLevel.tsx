import styled from 'styled-components';

export const MicLevel = ({ audioLevel }: { audioLevel: number }) => {
  const totalBars = 17; // 막대 개수
  const activeBars = Math.round((audioLevel / 255) * totalBars); // 활성화될 막대 개수
  return (
    <MicLevelWrapper>
      {[...Array(totalBars)].map((_, i) => (
        <MicLevelComponent key={i} $active={i < activeBars} />
      ))}
    </MicLevelWrapper>
  );
};

export const MicLevelWrapper = styled.div`
  display: flex;
  gap: 2px;
`;

export const MicLevelComponent = styled.div.attrs<{ $active: boolean }>(({ $active }) => ({
  style: { backgroundColor: $active ? '#f84883' : '#e6efff' },
}))`
  width: 8px;
  height: 18px;
  border-radius: 4px;
`;
