import { css } from '@emotion/css';

import HeaderDummy from "@components/HeaderDummy";
import { StatChartComponent } from './StatChartComponent';
import NavBarDummy from '../../components/NavBarDummy';
import { StatDescriptionComponent } from './StatDescriptionComponent';

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
