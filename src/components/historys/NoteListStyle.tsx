import styled, { css } from 'styled-components';
import { getStatusColor } from '../../utils/getStatusColor';

export const FiltersContainer = styled.div`
  display: flex;
  gap: 4px;
`;
export const SectionContainer = styled.div`
  height: 800px;
  padding: 42px 42px 30px 42px;
  background-color: ${({ theme }) => theme.colors.sementic.standard300};
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const TitleBox = styled.div`
  width: 83px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.typography.head5}
  color: ${({ theme }) => theme.colors.text100};
`;
export const QuestionCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 264px;
  height: 154px;
  padding: 20px 30px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.white};
  overflow: hidden;
  color: ${({ theme }) => theme.colors.text000};
  text-overflow: ellipsis;
  cursor: pointer;
`;

export const Date = styled.span`
  color: ${({ theme }) => theme.colors.text500};
  ${({ theme }) => theme.typography.title4}
  margin-bottom: 12px;
`;

export const Question = styled.p`
  overflow: hidden;
  color: ${({ theme }) => theme.colors.text000};
  text-overflow: ellipsis;
  ${({ theme }) => theme.typography.title3}
  margin-bottom: 8px;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Time = styled.span`
  color: ${({ theme }) => theme.colors.text800};
  ${({ theme }) => theme.typography.title4}
`;

export const StatusBadge = styled.span<{ status: string }>`
  display: flex;
  padding: 0px 4px;
  height: 18px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  ${({ theme }) => theme.typography.caption1}
  border-radius: 4px;
  ${({ status, theme }) => {
    const { background, color, border } = getStatusColor(status, theme);
    return css`
      background: ${background};
      color: ${color};
      border: 1px solid ${border};
    `;
  }}
`;
export const LoadingText = styled.div`
  text-align: center;
  margin-top: 10px;
  color: #666;
`;
export const ScrollWrapper = styled.div`
  height: 100%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
