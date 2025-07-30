import styled from 'styled-components';
import FailIcon from '../assets/img/Fail.svg';

interface FailProps {
  index: number;
  onReportClick?: () => void;
}

export const Fail = ({ index, onReportClick }: FailProps) => {
  return (
    <>
      <FailContainer>
        <FailImage src={FailIcon} alt="실패 아이콘" />
        <FailText>{index + 1}번 문항 답변 분석에 실패했어요</FailText>
        <SubText>
          인픽이가 문제를 수집하고 해결할 수 있도록
          <br />
          [문제 접수하기]를 눌러주세요
        </SubText>
      </FailContainer>{' '}
      <ButtonWrapper>
        <ReportButton onClick={onReportClick}>문제 접수하기</ReportButton>{' '}
      </ButtonWrapper>
    </>
  );
};

const FailContainer = styled.div`
  text-align: center;
  height: 356px;
  padding-top: 91px;
  box-sizing: border-box;
`;

const FailImage = styled.img`
  width: 240px;
  height: 117px;
  margin: 0 auto;
  display: block;
`;

const FailText = styled.p`
  font-size: 20px;
  margin-top: 16px;
  text-align: center;
  font-weight: 600;
  color: #888;
`;

const SubText = styled.p`
  font-size: 14px;
  margin-top: 4px;
  text-align: center;
  color: #888;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 40px;
`;

const ReportButton = styled.button`
  font-size: 14px;
  font-weight: 600;
  width: 129px;
  height: 36px;
  color: #3277ed;
  font-weight: 500;
  border: 1px solid #85beff;
  border-radius: 100px;
  cursor: pointer;
  margin-bottom: 8px;
  &:hover {
    background-color: #c3daff;
  }
`;
