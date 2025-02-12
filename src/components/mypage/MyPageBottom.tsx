import styled from 'styled-components';
import {
  FieldChange,
  FieldChangeTitle,
  FiledChangeIcon,
  MyPageBottomWrapper,
  MyPageField,
  MyPageInterest,
  MyPageInterestContent,
  MyPageIntersetTitle,
  MyPageTerms,
  MyPageTermsContent,
  MyPageTermsContents,
  MyPageTermsTitle,
} from './MyPageBottomStyle';

export const MyPageBottom = () => {
  return (
    <MyPageBottomWrapper>
      <MyPageInterest>
        <MyPageIntersetTitle>관심분야</MyPageIntersetTitle>
        <MyPageInterestContent>
          <MyPageField>React, Spring</MyPageField>
          <FieldChange>
            <FieldChangeTitle>변경하기</FieldChangeTitle>
            <FiledChangeIcon src="/images/Chevron_right.svg" alt="chevron_right" />
          </FieldChange>
        </MyPageInterestContent>
      </MyPageInterest>

      <MyPageTerms>
        <MyPageTermsTitle>이용약관</MyPageTermsTitle>
        <MyPageTermsContents>
          <MyPageTermsContent>
            개인정보처리방침
            <img src="/images/Chevron_right.svg" style={{ width: '16px' }} />
          </MyPageTermsContent>
          <MyPageTermsContent>
            서비스약관
            <img src="/images/Chevron_right.svg" style={{ width: '16px' }} />
          </MyPageTermsContent>
        </MyPageTermsContents>
      </MyPageTerms>

      <Withdrawal>회원탈퇴하기</Withdrawal>
    </MyPageBottomWrapper>
  );
};

export const Withdrawal = styled.div`
  padding: 40px;

  display: flex;
  justify-content: flex-end;
  padding-right: 12px;

  cursor: pointer;

  color: #4386f8;
  font-size: 14px;
  font-weight: 600;
  line-height: 150%;
`;
