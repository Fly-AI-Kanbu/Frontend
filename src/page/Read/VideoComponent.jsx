import { css } from '@emotion/css';
import { useState } from 'react';

const videoComponentStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  video {
    width: 100%;
  }
`;

export const VideoComponent = ({videoUrl}) => {
  //const [index, setIndex] = useState(0);
  return (
    <div className={videoComponentStyle}>
      <video
        src={videoUrl}
        playsInline
        controls
      />
    </div>
  );
};
