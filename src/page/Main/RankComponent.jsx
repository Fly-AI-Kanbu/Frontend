import { useEffect } from 'react';

import { css } from '@emotion/css';
import Common from "@style/common"

const rankStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
`;

export const RankComponent = () => {
  return (
    <div className={rankStyle}>
      <div className='national-flag'></div>
      <div className='rank'>
        <div className='national-rank'>National Rank <span>4th</span></div>
        <div className='my-rank'>My Rank <span>228th</span></div>
      </div>
    </div>
  );
};
