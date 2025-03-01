import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

export const BeforeVideo = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isFirstPlay, setIsFirstPlay] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      if (isFirstPlay) {
        // 처음 재생이 끝나면 isFirstPlay를 false로 설정
        setIsFirstPlay(false);
        video.currentTime = 9;
        video.play();
      }
    };

    const handleTimeUpdate = () => {
      if (!isFirstPlay && video.currentTime >= 15) {
        video.currentTime = 9;
        video.play();
      }
    };

    video.addEventListener('ended', handleEnded);
    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [isFirstPlay]);

  return (
    <BeforeVideoWrapper>
      <video ref={videoRef} muted autoPlay style={{ width: '100%', height: '100%' }}>
        <source src={`/images/inpeak.mp4`} type="video/mp4" />
      </video>
    </BeforeVideoWrapper>
  );
};

export const BeforeVideoWrapper = styled.div`
  width: 160px;
  height: 160px;

  margin-top: 50px;
`;
