import React from 'react';
import { FiAlignJustify, FiBell } from "react-icons/fi";
import Logo from "@assets/Logo.png";

import Common from "@style/common"
import { css } from '@emotion/css';

const headerStyle = css`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  max-width: ${Common.maxWidth};
  font-weight: 700;

  padding: .7em 1em;
  gap: .5em;
  color: rgba(${Common.colors.text});
  background-color: rgba(${Common.colors.background});
  border-bottom: 1px solid rgba(${Common.colors.border});

  .logo {
    display: flex;
    justify-content: center;
    align-items: center;

    margin-right: auto;
    img {
      /*width: 1em;*/
      height: 1.8em;
    }

    h1 {
      font-size: 1.2em;
    }
  }

  svg {
    font-size: 1.5em;
  }
`

const Header = () => {
  return (
    <div className={headerStyle}>
      <div className='logo'>
        <img src={Logo} alt="" />
        <h1>Kanbu</h1>
      </div>
      <FiBell />
      <FiAlignJustify />
    </div>
  );
};

export default Header;
