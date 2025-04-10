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
import { registerInterest } from '../../../api/interest/interestAPI';
import { GetMyPage } from '../../../api/getMyPage/GetMyPage';

export const SelectStack = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [select, setSelect] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkUserInterests = async () => {
      const params = new URLSearchParams(location.search);
      const status = params.get('status');

      if (status === 'NEED_MORE_INFO') {
        try {
          const user = await GetMyPage();
          if (!user.interests || user.interests.length === 0) {
            setIsVisible(true); // interests 비어있으면 모달 띄움
          } else {
            setIsVisible(false); // interests 있으면 안 띄움
          }
        } catch (err) {
          console.error('유저 정보 확인 실패:', err);
          setIsVisible(false); // 에러일 땐 일단 모달 안 띄움
        }
      } else {
        setIsVisible(false);
      }
    };

    checkUserInterests();
  }, [location]);

  const handleComplete = async () => {
    if (select.length === 0) {
      alert('관심분야를 최소 1개 이상 선택해주세요.');
      return;
    }

    const interestTypes = select.map(item => item.toUpperCase());
    const result = await registerInterest(interestTypes);

    if (result.success) {
      setIsVisible(false);
      navigate('/');
      window.history.replaceState({}, '', '/');
    } else {
      alert(result.message);
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
