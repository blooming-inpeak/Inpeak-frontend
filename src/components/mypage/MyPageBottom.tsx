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
import { SelectStack } from '../common/selectStack/SelectStack';
import { PrivacyPolicyModal } from '../common/policy/Policy';

export const MyPageBottom = ({ interests }: { interests: string[] | undefined }) => {
  const [isWithdrawal, setIsWithdrawal] = useState(false);
  const [isSelectStack, setIsSelectStack] = useState(false);
  const [isPolicy, setIsPolicy] = useState('');

  const onClickPrivacy = () => {
    setIsPolicy('privacy');
  };

  const onClickService = () => {
    setIsPolicy('service');
  };

  return (
    <MyPageBottomWrapper>
      <MyPageInterest>
        <MyPageIntersetTitle>관심분야</MyPageIntersetTitle>
        <MyPageInterestContent>
          <MyPageField>{interests?.join(', ')}</MyPageField>
          <FieldChange>
            <FieldChangeTitle onClick={() => setIsSelectStack(true)}>변경하기</FieldChangeTitle>
            <FiledChangeIcon src="/images/chevron/Chevron_right.svg" alt="chevron_right" />
          </FieldChange>
        </MyPageInterestContent>
      </MyPageInterest>

      <MyPageTerms>
        <MyPageTermsTitle>이용약관</MyPageTermsTitle>
        <MyPageTermsContents>
          <MyPageTermsContent onClick={onClickPrivacy}>
            개인정보처리방침
            <img src="/images/chevron/Chevron_right.svg" style={{ width: '16px' }} />
          </MyPageTermsContent>
          <MyPageTermsContent onClick={onClickService}>
            서비스약관
            <img src="/images/chevron/Chevron_right.svg" style={{ width: '16px' }} />
          </MyPageTermsContent>
        </MyPageTermsContents>
      </MyPageTerms>

      <Withdrawal onClick={() => setIsWithdrawal(true)}>회원탈퇴하기</Withdrawal>

      {isWithdrawal && (
        <BlurBackground>
          <WithdrawalModal onClose={() => setIsWithdrawal(false)} />
        </BlurBackground>
      )}
      {isSelectStack && (
        <BlurBackground>
          <SelectStack />
        </BlurBackground>
      )}
      {isPolicy && (
        <BlurBackground>
          <PrivacyPolicyModal isPolicy={isPolicy} onClose={() => setIsPolicy('')} />
        </BlurBackground>
      )}
    </MyPageBottomWrapper>
  );
};
