import { css } from '@emotion/css';

import HeaderDummy from "@components/HeaderDummy";
import { QuizComponent } from './QuizComponent';
import NavBarDummy from '@components/NavBarDummy';

const quizPageStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
`;

export const QuizPage = () => {
  return (
    <div className={quizPageStyle}>
      <HeaderDummy />
      <QuizComponent />
      <NavBarDummy />
    </div>
  );
};
