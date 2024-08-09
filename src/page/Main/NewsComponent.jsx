import { useEffect } from 'react';

import { css } from '@emotion/css';
import Common from "@style/common"

const newsStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
`;

export const NewsComponent = () => {
  return (
    <div className={newsStyle}>
      NewsComponent
    </div>
  );
};
