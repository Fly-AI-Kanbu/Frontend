import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiAlignJustify, FiBell } from "react-icons/fi";
import Logo from "@assets/Logo.png";

import Common from "@style/common"
import { css } from '@emotion/css';

const headerStyle = css`
  z-index: 100;
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
    font-size: 1.2em;

    cursor: pointer;
  }

  svg {
    font-size: 1.5em;
  }
`

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className={headerStyle}>
      <div className='logo' onClick={()=>{navigate('/')}}>Kanbu</div>
      <FiBell />
      <FiAlignJustify />
    </div>
  );
};

export default Header;
