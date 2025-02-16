import styled from 'styled-components';

type CaptionProps = {
  name: '정답' | '포기' | '오답';
};

export const Caption = ({ name }: CaptionProps) => {
  return <CatptionWrapper name={name}>{name}</CatptionWrapper>;
};

export const CatptionWrapper = styled.div<CaptionProps>`
  width: 18px;
  height: 15px;
  padding: 1px 4px;

  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 10px;
  font-weight: 500;
  letter-spacing: -0.25px;

  color: ${({ name }) => (name === '포기' ? '#85C000' : name === '정답' ? '#0050D8' : '#F84883')};
  background-color: ${({ name }) => (name === '포기' ? '#F5F9FF' : name === '정답' ? '#0050D8' : '#FFF3F4')};
`;
