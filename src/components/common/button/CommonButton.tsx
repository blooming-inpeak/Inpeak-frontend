import styled from 'styled-components';

type CommonButtonProps = {
  width?: string | number;
  height?: string | number;
};

export const CommonButton = styled.button<CommonButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  ${({ theme }) => theme.typography.button2};

  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width || 'auto')};
  height: ${({ height }) => (typeof height === 'number' ? `${height}px` : height || 'auto')};

  background: ${({ theme }) => theme.colors.brand.main};
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    background: ${({ theme }) => theme.colors.blue800};
  }
`;
