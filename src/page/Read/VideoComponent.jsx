import { css } from '@emotion/css';
import { useRef } from 'react';

const videoComponentStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  video {
    width: 100%;
  }
`;

export const VideoComponent = ({ videoUrl, onTimeUpdate }) => {
  const videoRef = useRef(null);

  const handleTimeUpdate = () => {
    const currentTime = videoRef.current.currentTime;
    onTimeUpdate(currentTime);  // 비디오의 현재 시간을 부모로 전달
  };

  return (
    <div className={videoComponentStyle}>
      <video
        ref={videoRef}
        src={videoUrl}
        playsInline
        controls
        onTimeUpdate={handleTimeUpdate}  // 시간이 업데이트될 때마다 호출
      />
    </div>
  );
};
