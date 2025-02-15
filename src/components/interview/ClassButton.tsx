import styled from 'styled-components';

interface Props {
  name: string;
  isSelect: boolean;
  setIsSelect: (name: string) => void;
}

export const ClassButton = ({ name, isSelect, setIsSelect }: Props) => {
  return (
    <ClassButtonWrapper
      style={{ color: isSelect ? '#0050d8' : '#747474', backgroundColor: isSelect ? '#e6efff' : '#f5f9ff' }}
      onClick={() => setIsSelect(name)}
    >
      {name}
    </ClassButtonWrapper>
  );
};

export const ClassButtonWrapper = styled.div`
  width: 21px;
  height: 18px;
  padding: 4px 10px;
  cursor: pointer;

  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 12px;
  font-weight: 500;
  letter-spacing: -0.3px;

  margin-bottom: 20px;
`;
