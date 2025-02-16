import styled from 'styled-components';
import { Caption } from './Caption';

export const AskHistoryBox = () => {
  return (
    <AskHistoryBoxWrapper>
      <AskHistoryContent>
        <div style={{ display: 'flex' }}>
          <AskHistoryQuestion>사용자 중심 디자인에 귀하의 접근 방식을 설명해 주시겠어요?</AskHistoryQuestion>
          <Caption name="포기" />
        </div>
        <AskHistoryAnswer>
          저는 디자인이 단순히 문제 해결을 넘어, 감정적 연결과 긍정적 경험을 제공해야 한다고 믿습니다.
        </AskHistoryAnswer>
      </AskHistoryContent>

      <img src="/images/chevron/Chevron_right_black.svg" alt="chevron right" style={{ cursor: 'pointer' }} />
    </AskHistoryBoxWrapper>
  );
};

export const AskHistoryBoxWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding-bottom: 24px;

  & + & {
    padding-top: 24px;
    border-top: 1px solid #f1f1f1;
  }
`;

export const AskHistoryContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const AskHistoryQuestion = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-right: 6px;
`;

export const AskHistoryAnswer = styled.div`
  color: #747474;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: -0.3px;
`;
