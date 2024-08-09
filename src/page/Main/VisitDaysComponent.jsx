import { useEffect } from 'react';

import { css } from '@emotion/css';
import Common from "@style/common"

const visitDaysComponent = css`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
`;

export const VisitDaysComponent = () => {
  return (
    <div className={visitDaysComponent}>
      visitDaysComponent
    </div>
  );
};
