import { useEffect } from 'react';

import { css } from '@emotion/css';
import Common from "@style/common"

import { RankComponent } from './RankComponent';

const titleStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;

  font-size: 48px;
  font-weight: 700;
`;

export const MainPage = () => {
  return (
    <div>
      {/*<h1 className={titleStyle}>main</h1>*/}
      <RankComponent />
    </div>
  );
};
