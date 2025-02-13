import {
  CloseButton,
  NoButton,
  WithdrawalBody,
  WithdrawalButtons,
  WithdrawalContent,
  WithdrawalModalWrapper,
  WithdrawalSubTitle,
  WithdrawalTitle,
  YesButton,
} from './WithdrawalModalStyle';

export const WithdrawalModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <WithdrawalModalWrapper>
      <CloseButton>
        <img src="/images/Close.svg" alt="close icon" style={{ width: '24px', cursor: 'pointer' }} onClick={onClose} />
      </CloseButton>

      <WithdrawalBody>
        <WithdrawalContent>
          <WithdrawalTitle>정말 회원탈퇴를 진행하실 건가요?</WithdrawalTitle>
          <WithdrawalSubTitle>회원 정보 및 그동안의 면접 히스토리는 즉시 삭제됩니다.</WithdrawalSubTitle>
        </WithdrawalContent>

        <WithdrawalButtons>
          <YesButton>탈퇴하기</YesButton>
          <NoButton>회원을 유지하기</NoButton>
        </WithdrawalButtons>
      </WithdrawalBody>
    </WithdrawalModalWrapper>
  );
};
