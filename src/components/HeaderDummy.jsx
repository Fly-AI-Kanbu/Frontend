import React from 'react';
import { FiAlignJustify, FiBell } from "react-icons/fi";

import Common from "@style/common"
import { css } from '@emotion/css';

const headerStyle = css`
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  /*width: 100vw;*/
  width: 100%;
  /*font-size: 1.2em;*/
  font-weight: 700;

  padding: .7em 1em;
  gap: .5em;
  /*color: ${Common.colors.primary};*/

  h1 {
    font-size: 1.2em;
    margin-right: auto;
  }

  svg {
    font-size: 1.5em;
  }
`

const HeaderDummy = () => {
  return (
    <div className={headerStyle}>
      <h1>Kanbu</h1>
      <FiBell />
      <FiAlignJustify />
    </div>
  );
};

export default HeaderDummy;
