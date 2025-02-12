import styled from 'styled-components';

interface Props {
  setOpenLogin: (value: boolean) => void;
}

export const LoginModal = ({ setOpenLogin }: Props) => {
  const onClickClose = () => {
    setOpenLogin(false);
  };

  return (
    <LoginModalContainer>
      <CloseButton>
        <img src="/images/Close.svg" alt="close" onClick={onClickClose} />
      </CloseButton>
    </LoginModalContainer>
  );
};

export const LoginModalContainer = styled.div`
  width: 504px;
  height: 539px;
  padding: 20px 24px 80px 24px;
  background-color: #ffffff;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  border-radius: 24px;

  box-shadow: 0px 0px 24px 0px rgba(50, 59, 84, 0.24);
`;

export const CloseButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;

  img {
    width: 24px;
    height: 24px;

    cursor: pointer;
  }
`;
