import { useEffect } from 'react';

import { css } from '@emotion/css';
import Common from "@style/common"

const todayVocabStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
`;

export const TodayVocabComponent = () => {
  return (
    <div className={todayVocabStyle}>
      todayVocabComponent
    </div>
  );
};
