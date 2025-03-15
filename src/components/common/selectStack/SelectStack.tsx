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

export const SelectStack = ({ onClose }: { onClose: () => void }) => {
  return (
    <SelectStackWrapper>
      <img
        src="/images/chevron/Chevron_left.svg"
        alt="chevron left"
        onClick={onClose}
        style={{ width: '24px', cursor: 'pointer' }}
      />

      <SelectStackBody>
        <SelectStackContent>
          <SelectStackContentTop>
            <SelectStackTitle>관심 분야를 선택해주세요</SelectStackTitle>
            <SelectStackSubTitle>가입완료 후 마이페이지에서 변경가능합니다</SelectStackSubTitle>
          </SelectStackContentTop>

          <SelectStackContentBottom>
            <Button name={'React'} color={'#1BC0E7'} />
            <Button name={'Spring'} color={'#ffffff'} />
            <Button name={'Database'} color={'#FFC813'} />
          </SelectStackContentBottom>
        </SelectStackContent>

        <SelectStackButton>선택완료</SelectStackButton>
      </SelectStackBody>
    </SelectStackWrapper>
  );
};
