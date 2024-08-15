import { css } from '@emotion/css';

import { RankComponent } from './RankComponent';
import { NewsComponent } from './NewsComponent';
import { TodayVocabComponent } from './TodayVocabComponent';
import { VisitDaysComponent } from './VisitDaysComponent';

const mainPageStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3em;

  gap: 1.5em;
  width: 100vw;
`;

export const MainPage = () => {
  return (
    <div className={mainPageStyle}>
      <RankComponent />
      <TodayVocabComponent />
      <VisitDaysComponent />
      <NewsComponent />
    </div>
  );
};
