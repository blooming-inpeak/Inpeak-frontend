import React from 'react';
import styled from 'styled-components';
import { CaptionType } from './CaptionType';

interface CaptionProps {
  type: CaptionType;
}

export const MultiCaption: React.FC<CaptionProps> = ({ type }) => {
  const { label, width, height, fontsize, background, color, border } = getCaptionStyle(type);

  return (
    <CaptionContainer
      width={width}
      height={height}
      fontsize={fontsize}
      background={background}
      color={color}
      border={border}
    >
      {label}
    </CaptionContainer>
  );
};

function getCaptionStyle(type: CaptionType) {
  switch (type) {
    case '오답-large':
      return {
        label: '오답',
        width: 29,
        height: 18,
        fontsize: 12,
        background: '#FFF3F4',
        color: '#F84883',
        border: '1px solid #F84883',
      };
    case '정답-large':
      return {
        label: '정답',
        width: 29,
        height: 18,
        fontsize: 12,
        background: '#F5F9FF',
        color: '#0050D8',
        border: '1px solid #0050D8',
      };
    case '포기-large':
      return {
        label: '포기',
        width: 29,
        height: 18,
        fontsize: 12,
        background: '#F8FFEA',
        color: '#85C000',
        border: '1px solid #85C000',
      };
    case '이해완료':
      return {
        label: '이해완료',
        width: 49,
        height: 18,
        fontsize: 12,
        background: '#FAFAFA',
        color: '#747474',
        border: '1px solid #747474',
      };
    case '이해완료-small':
      return {
        label: '이해완료',
        width: 42,
        height: 17,
        fontsize: 10,
        background: '#FAFAFA',
        color: '#747474',
      };
    case '오답-small':
      return {
        label: '오답',
        width: 26,
        height: 17,
        fontsize: 10,
        background: '#FFF3F4',
        color: '#F84883',
        border: 'none',
      };
    case '정답-small':
      return {
        label: '정답',
        width: 26,
        height: 17,
        fontsize: 10,
        background: '#F5F9FF',
        color: '#0050D8',
        border: 'none',
      };
    case '포기-small':
      return {
        label: '포기',
        width: 26,
        height: 17,
        fontsize: 10,
        background: '#F8FFEA',
        color: '#85C000',
        border: 'none',
      };
    case 'ad':
      return {
        label: 'AD',
        width: 22,
        height: 17,
        fontsize: 10,
        background: 'rgba(0, 0, 0, 0.20)',
        color: '#212121',
        border: 'none',
      };
    default:
      return {
        label: '',
        width: 0,
        height: 0,
        fontsize: 10,
        background: 'transparent',
        color: '#000',
        border: 'none',
      };
  }
}

const CaptionContainer = styled.div<{
  width: number;
  height: number;
  fontsize: number;
  background: string;
  color: string;
  border?: string;
}>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  font-size: ${({ fontsize }) => fontsize}px;

  background-color: ${({ background }) => background};
  color: ${({ color }) => color};

  border: ${({ border }) => border || 'none'};

  font-weight: 500;
  border-radius: 4px;
`;
