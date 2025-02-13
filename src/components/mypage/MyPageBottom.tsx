import { useState } from 'react';
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
  Withdrawal,
} from './MyPageBottomStyle';
import { BlurBackground } from '../common/background/BlurBackground';
import { WithdrawalModal } from './WithdrawalModal';

export const MyPageBottom = () => {
  const [isWithdrawal, setIsWithdrawal] = useState(false);

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

      <Withdrawal onClick={() => setIsWithdrawal(true)}>회원탈퇴하기</Withdrawal>

      {isWithdrawal && (
        <BlurBackground>
          <WithdrawalModal onClose={() => setIsWithdrawal(false)} />
        </BlurBackground>
      )}
    </MyPageBottomWrapper>
  );
};
