import { css } from '@emotion/css';

import HeaderDummy from "@components/HeaderDummy";
import { RankComponent } from './RankComponent';
import { NewsComponent } from './NewsComponent';
import { TodayVocabComponent } from './TodayVocabComponent';
import { VisitDaysComponent } from './VisitDaysComponent';

const mainPageStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 1em;
  width: 100vw;
`;

export const MainPage = () => {
  return (
    <div className={mainPageStyle}>
      <HeaderDummy />
      <RankComponent />
      <TodayVocabComponent />
      <VisitDaysComponent />
      <NewsComponent />
    </div>
  );
};
