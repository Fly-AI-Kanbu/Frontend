import React from 'react';
import { css } from '@emotion/css';
import HeaderDummy from '@components/HeaderDummy';
import NavBarDummy from '@components/NavBarDummy';
import { CallModelComponent } from './CallModelComponent';

const callPageStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

export const CallPage = () => {
  return (
    <div className={callPageStyle}>
      <HeaderDummy />
      <CallModelComponent />
      <NavBarDummy />
    </div>
  );
};
