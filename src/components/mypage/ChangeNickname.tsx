import { useState } from 'react';
import styled from 'styled-components';
import { SaveNicknameAPI } from '../../api/changeNickname/SaveNicknameAPI';
import { useSetRecoilState } from 'recoil';
import { userState } from '../../store/auth/userState';
import axios from 'axios';
import { useOutsideClick } from '../../utils/useOutsideClick';

interface Props {
  close: () => void;
}

export const ChangeNickname = ({ close }: Props) => {
  const setUser = useSetRecoilState(userState);
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');

  const ref = useOutsideClick<HTMLDivElement>(close);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNickname(value);

    if (value.length === 0) {
      setError('');
      return;
    }

    const isValidChar = /^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]+$/.test(value);

    if (!isValidChar) {
      setError('한글 또는 영문만 입력 가능합니다.');
      return;
    }

    // 자음/모음 단독 포함해도 길이로 판단
    if (value.length < 2) {
      setError('2글자 이상의 닉네임만 사용 가능합니다.');
    } else if (value.length > 8) {
      setError('8글자 이하의 닉네임만 사용 가능합니다.');
    } else {
      setError('');
    }
  };

  const saveNickname = async () => {
    if (!error && nickname.length > 0) {
      try {
        const data = await SaveNicknameAPI(nickname);
        setUser(prev => (prev ? { ...prev, nickname: data } : prev));
        const cachedUser = localStorage.getItem('user');
        if (cachedUser) {
          const parsed = JSON.parse(cachedUser);
          parsed.nickname = data;
          localStorage.setItem('user', JSON.stringify(parsed));
        }
        close();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 400) {
            setError('중복된 닉네임입니다.');
          }
        }
      }
    }
  };

  return (
    <ChangeNicknameWrapper ref={ref}>
      <CloseContainer>
        <img src="/images/Close.svg" alt="close" onClick={close} style={{ cursor: 'pointer' }} />
      </CloseContainer>

      <Title>변경하실 닉네임을 입력해주세요</Title>

      <NicknameForm>
        <Content>
          <ChangeInput
            placeholder="한글 2글자, 영문 4글자 이상 8글자 이하"
            value={nickname}
            onChange={handleChange}
            $isError={error}
          />
          <SaveButton $isError={error} $isNickname={nickname} onClick={saveNickname}>
            저장
          </SaveButton>
        </Content>
        {error && (
          <ErrorMessage>
            <img src="/images/Infrmationmark.svg" alt="Infrmationmark" style={{ width: '18px' }} />
            {error}
          </ErrorMessage>
        )}
      </NicknameForm>
    </ChangeNicknameWrapper>
  );
};

export const ChangeNicknameWrapper = styled.div`
  width: 469px;
  height: 141px;
  padding: 24px 24px 60px 24px;

  border-radius: 24px;
  background-color: #ffffff;
  box-shadow: 0px 0px 24px 0px rgba(50, 59, 84, 0.24);

  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const CloseContainer = styled.div`
  width: 100%;
`;

export const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 16px;
  font-weight: 400;
  letter-spacing: -0.4px;
`;

export const NicknameForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

export const ChangeInput = styled.input<{ $isError?: string }>`
  width: 260px;
  height: 21px;
  padding: 12px 20px;

  border: 1px solid #e6efff;
  border-radius: 8px;
  outline: none;

  color: #212121;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.35px;

  &::placeholder {
    color: #afafaf;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: -0.35px;
  }

  &:focus {
    border: 1px solid ${({ $isError }) => ($isError ? '#fb7ea8' : '#85b2ff')};
    box-shadow: ${({ $isError }) => ($isError ? '' : '0px 0px 4px 0px rgba(50, 119, 237, 0.8)')};
  }
`;

export const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: 40px;

  color: #f8488e;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: -0.3px;
`;

export const SaveButton = styled.div<{ $isError: string; $isNickname: string }>`
  width: 76px;
  height: 36px;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  border-radius: 100px;
  background-color: ${({ $isError, $isNickname }) => (!$isError && $isNickname.length !== 0 ? '#3277ED' : '#e6e6e6')};

  color: ${({ $isError, $isNickname }) => (!$isError && $isNickname.length !== 0 ? '#ffffff' : '#707991')};
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.35px;
`;
