import { useEffect, useState } from 'react';
import styled from 'styled-components';

export const MyStack = () => {
  const [myInterest, setMyInterest] = useState<string[]>([]);

  // 일단 오류나서 해놨습니다.
  useEffect(() => {
    setMyInterest(['React', 'Spring']);
  }, []);

  return (
    <MyStackWrapper>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <MyStackTitle>나의 관심사</MyStackTitle>
        <MyStackSubTitle>마이페이지에서 변경 할 수 있어요</MyStackSubTitle>
      </div>

      <MyStackContent>
        {myInterest.map((interest, index) => {
          return (
            <span key={index}>
              <span>{interest}</span>
              {myInterest.length - 1 !== index && <span>, </span>}
            </span>
          );
        })}
      </MyStackContent>
    </MyStackWrapper>
  );
};

export const MyStackWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-bottom: 12px;

  border-bottom: 1px solid #ededed;
`;

export const MyStackTitle = styled.div`
  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.35px;
`;

export const MyStackSubTitle = styled.div`
  color: #afafaf;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: -0.25px;
`;

export const MyStackContent = styled.div`
  color: #85b2ff;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: -0.3px;
`;
