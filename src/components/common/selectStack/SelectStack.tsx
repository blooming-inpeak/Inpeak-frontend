import { useEffect, useState } from 'react';
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
import { registerInterest } from '../../../api/interest/interestAPI';
import { updateInterest } from '../../../api/interest/updateInterestAPI';

interface Props {
  method?: 'post' | 'put';
  autoVisible?: boolean; // 쿼리 기반 자동 오픈 여부
}

export const SelectStack = ({ method = 'post', autoVisible = false }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [select, setSelect] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(!autoVisible);

  useEffect(() => {
    if (!autoVisible) return;

    const params = new URLSearchParams(location.search);
    const status = params.get('status');

    if (status === 'NEED_MORE_INFO') {
      setIsVisible(true);
    }
  }, [location, autoVisible]);

  const handleComplete = async () => {
    if (select.length === 0) {
      alert('관심분야를 최소 1개 이상 선택해주세요.');
      return;
    }

    const interestTypes = select.map(item => item.toUpperCase());
    // method에 따라 API 호출 분기
    const result = method === 'put' ? await updateInterest(interestTypes) : await registerInterest(interestTypes);

    if (result.success) {
      setIsVisible(false);

      if (method === 'put') {
        window.location.href = '/mypage';
      } else {
        navigate('/');
        window.history.replaceState({}, '', '/');
      }
    }
  };

  if (!isVisible) return null;

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
