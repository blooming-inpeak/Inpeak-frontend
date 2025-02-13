import styled from 'styled-components';

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

export const WithdrawalModalWrapper = styled.div`
  width: 402px;
  height: 139px;

  padding: 24px 24px 40px 24px;
  gap: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-radius: 24px;
  background-color: #ffffff;
  box-shadow: 0px 0px 24px 0px rgba(50, 59, 84, 0.24);
`;

export const CloseButton = styled.div`
  width: 100%;
  justify-content: flex-start;
`;

export const WithdrawalBody = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const WithdrawalContent = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const WithdrawalTitle = styled.div`
  color: #212121;

  font-size: 16px;
  font-weight: 600;
  line-height: 150%;
`;

export const WithdrawalSubTitle = styled.div`
  color: #212121;

  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.35px;
`;

export const WithdrawalButtons = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 8px;
`;

export const YesButton = styled.div`
  width: 64px;
  height: 24px;
  padding: 6px 18px;

  border-radius: 100px;
  background-color: #c3daff;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 14px;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.35px;
  color: #0050d8;

  cursor: pointer;
`;

export const NoButton = styled.div`
  width: 102px;
  height: 24px;

  padding: 6px 18px;
  border-radius: 100px;
  background-color: #3277ed;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.35px;

  cursor: pointer;
`;
