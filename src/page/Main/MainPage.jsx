import { css } from '@emotion/css';

import HeaderDummy from "@components/HeaderDummy";
import { ProfileComponent } from './ProfileComponent';
import { RankComponent } from './RankComponent';
import { NewsComponent } from './NewsComponent';
import { TodayVocabComponent } from './TodayVocabComponent';
import { VisitDaysComponent } from './VisitDaysComponent';

const mainPageStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
`;

export const MainPage = () => {
  return (
    <div className={mainPageStyle}>
      <HeaderDummy />
      <ProfileComponent />
      {/*<RankComponent />*/}
      <TodayVocabComponent />
      <VisitDaysComponent />
      <NewsComponent />
    </div>
  );
};
