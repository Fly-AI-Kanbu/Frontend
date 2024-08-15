import React from 'react';
import { FiAlignJustify, FiBell, FiList, FiMessageSquare, FiBarChart2, FiHome, FiUser, FiCheckSquare } from "react-icons/fi";

import Common from "@style/common"
import { css } from '@emotion/css';

const navBarStyle = css`
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  max-width: ${Common.maxWidth};
  font-weight: 700;

  padding: .7em 1em;
  color: rgba(${Common.colors.text});
  background-color: rgba(${Common.colors.background});
`

const navBarItemStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  padding: .3em;
  /*background-color: rgba(${Common.colors.primary100});*/

  border-right: 1px solid rgba(${Common.colors.border});
  &:last-child {
    border-right: none;
  }

  .name {
    font-size: .7em;
    font-weight: 700;
  }
  svg {
    font-size: 1.5em;
  }
`;

const NavBarItemList = [
  {
    icon: FiMessageSquare,
    children: '대화'
  },
  {
    icon: FiBarChart2,
    children: ''
  },
  {
    icon: FiHome,
    children: 'Menu'
  },
  {
    icon: FiCheckSquare,
    children: 'Menu'
  },
  {
    icon: FiUser,
    children: 'Menu'
  },
];

const NavBarItem = ({ children, icon }) => {
  return (
    <div className={navBarItemStyle}>
      {icon()}
      {/*<div className='name'>{children}</div>*/}
    </div>
  );
};

const NavBarDummy = () => {
  return (
    <div className={navBarStyle}>
      {NavBarItemList.map((item, index) => (
        <NavBarItem key={index} {...item} />
      ))}
    </div>
  );
};

export default NavBarDummy;
