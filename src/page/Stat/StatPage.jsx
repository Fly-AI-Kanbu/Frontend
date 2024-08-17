import { css } from '@emotion/css';

import HeaderDummy from "@components/HeaderDummy";
import { StatChartComponent } from './StatChartComponent';
import { StatDescriptionComponent } from './StatDescriptionComponent';
import NavBarDummy from '@components/NavBarDummy';

const statPageStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
`;

export const StatPage = () => {
  return (
    <div className={statPageStyle}>
      <HeaderDummy />
      <StatChartComponent />
      <StatDescriptionComponent />
      <NavBarDummy />
    </div>
  );
};
