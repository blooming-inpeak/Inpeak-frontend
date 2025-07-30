import styled from 'styled-components';

// 관심분야
export const MyPageBottomWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const MyPageInterest = styled.div`
  width: 100%;
  height: 105px;

  gap: 4px;

  padding-bottom: 40px;
  border-bottom: 1px solid #ededed;
`;

export const MyPageIntersetTitle = styled.div`
  color: #212121;
  text-align: center;

  font-size: 16px;
  font-weight: 600;
  line-height: 150%;

  display: flex;
  justify-content: flex-start;

  margin-bottom: 4px;
`;

export const MyPageInterestContent = styled.div`
  width: 400px;
  height: 37px;

  padding: 8px 12px;

  border-radius: 8px;
  background-color: #eff5ff;

  display: flex;
  justify-content: space-between;
`;

export const MyPageField = styled.div`
  display: flex;

  color: #888;

  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.35px;
`;

export const FieldChange = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

export const FieldChangeTitle = styled.div`
  color: #3277ed;

  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.35px;
`;

export const FiledChangeIcon = styled.img`
  width: 16px;
`;

// 이용약관

export const MyPageTerms = styled.div`
  width: 100%;
  height: 106px;

  padding: 20px 0 40px 0;
  display: flex;
  justify-content: space-between;

  border-bottom: 1px solid #ededed;
`;

export const MyPageTermsTitle = styled.div`
  color: #212121;

  font-size: 16px;
  font-weight: 600;
  line-height: 150%;
`;

export const MyPageTermsContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;

  padding-right: 8px;
  gap: 4px;
`;

export const MyPageTermsContent = styled.div`
  color: #3277ed;

  display: flex;
  cursor: pointer;

  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.35px;
`;

// 회원탈퇴
export const Withdrawal = styled.div`
  padding-top: 40px;

  display: flex;
  justify-content: flex-end;
  padding-right: 12px;

  cursor: pointer;

  color: #4386f8;
  font-size: 14px;
  font-weight: 600;
  line-height: 150%;
`;
