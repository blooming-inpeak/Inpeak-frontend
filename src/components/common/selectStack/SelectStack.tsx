import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from './Button';
import {
  SelectStackBody,
  SelectStackButton,
  SelectStackContent,
  SelectStackContentBottom,
  SelectStackContentTop,
  SelectStackSubTitle,
  SelectStackTitle,
  SelectStackWrapper,
} from './SelectStackStyle';
import { BlurBackground } from '../background/BlurBackground';

export const SelectStack = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [select, setSelect] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get('status');

    if (status === 'NEED_MORE_INFO') {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [location]);

  const handleComplete = async () => {
    if (select.length === 0) {
      alert('관심분야를 최소 1개 이상 선택해주세요.');
      return;
    }

    const interestTypes = select.map(item => item.toUpperCase());

    try {
      const response = await fetch('/interest', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ interestTypes }),
      });

      if (response.status === 201) {
        setIsVisible(false); // 모달 닫기
        navigate('/');
        window.history.replaceState({}, '', '/'); // URL 정리
      } else {
        alert('관심분야 등록 실패');
      }
    } catch (error) {
      console.error('관심분야 등록 중 오류:', error);
      alert('관심분야 등록 중 오류 발생');
    }
  };

  if (!isVisible) return null; // 보이지 않으면 아무것도 렌더하지 않음

  return (
    <BlurBackground>
      <SelectStackWrapper>
        <SelectStackBody>
          <SelectStackContent>
            <SelectStackContentTop>
              <SelectStackTitle>관심 분야를 선택해주세요</SelectStackTitle>
              <SelectStackSubTitle>가입완료 후 마이페이지에서 변경가능합니다</SelectStackSubTitle>
            </SelectStackContentTop>

            <SelectStackContentBottom>
              <Button name={'React'} color={'#1BC0E7'} setSelect={setSelect} select={select} />
              <Button name={'Spring'} color={'#ffffff'} setSelect={setSelect} select={select} />
              <Button name={'Database'} color={'#FFC813'} setSelect={setSelect} select={select} />
            </SelectStackContentBottom>
          </SelectStackContent>

          <SelectStackButton onClick={handleComplete}>선택완료</SelectStackButton>
        </SelectStackBody>
      </SelectStackWrapper>
    </BlurBackground>
  );
};
