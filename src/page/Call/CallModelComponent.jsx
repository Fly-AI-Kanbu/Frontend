import { useEffect, useState } from 'react';

import { css } from '@emotion/css';
import Common from "@style/common"

const callModelComponentStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  flex-grow: 1;
  justify-content: center;

  img {
    width: 55%;
    border-radius: 45%;
    animation: audioWave 1s infinite;
  }

  .time-count {
    font-size: 2em;
    font-weight: 700;
    margin-top: 1rem;
    color: rgba(${Common.colors.text});
  }
  .description {
    font-size: 1em;
    font-weight: 600;
    color: rgba(${Common.colors.text}, 0.7);
  }

  @keyframes audioWave {
    0% {
      box-shadow: 0 0 20px rgba(${Common.colors.primary400});
    }
    50% {
      box-shadow: 0 0 40px rgba(${Common.colors.primary800}), 0 0 20px rgba(${Common.colors.primary600});
    }
    100% {
      box-shadow: 0 0 20px rgba(${Common.colors.primary400});
    }
  }
`;

export const CallModelComponent = () => {
  const [timeCount, setTimeCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeCount(timeCount + 1);
    }, 1000);

    return () => clearInterval(timer);
  });

  return (
    <div className={callModelComponentStyle}>
      <img src="https://cdn.prod.website-files.com/657639ebfb91510f45654149/6642741e323daf4ab36b0877_Frame%2048095503.png" alt="" />
      {/*<img src="https://sungyesa.com/new/data/file/secret/988486029_Pxj6X8Yl_IMG_8052.jpeg" alt="" />*/}
      
      <div className='time-count'>{String(Math.floor(timeCount / 60)).padStart(2, '0')}:{String(timeCount % 60).padStart(2, '0')}</div>
      <div className='description'>AI 모델과 대화해보세요</div>
    </div>
  );
};
