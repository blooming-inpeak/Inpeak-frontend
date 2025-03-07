import { useEffect, useState } from 'react';
import {
  PrivacytFooterButton,
  PrivacyContent,
  PrivacyFooter,
  PrivacyTitle,
  PrivacyTop,
  PrivacyWrapper,
  Space,
} from './PolicyStyle';

interface Props {
  isPolicy: string;
  onClose: () => void;
}

export const PrivacyPolicyModal = ({ isPolicy, onClose }: Props) => {
  const [privacyContent, setPrivacyContent] = useState('');

  useEffect(() => {
    const fetchFileContent = async () => {
      const response = await fetch(`/policy/${isPolicy}.txt`);
      const text = await response.text();
      setPrivacyContent(text);
    };

    fetchFileContent();
  }, [isPolicy]);

  return (
    <PrivacyWrapper>
      <PrivacyTop>
        <img src="/images/chevron/Chevron_left.svg" alt="Chevron_left" onClick={onClose} style={{ width: '24px' }} />
        <PrivacyTitle>{isPolicy === 'privacy' ? '개인정보처리방침' : '서비스 약관'}</PrivacyTitle>
        <Space />
      </PrivacyTop>

      <PrivacyContent>{privacyContent}</PrivacyContent>

      <PrivacyFooter>
        <PrivacytFooterButton onClick={onClose}>확인</PrivacytFooterButton>
      </PrivacyFooter>
    </PrivacyWrapper>
  );
};
