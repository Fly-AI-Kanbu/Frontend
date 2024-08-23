import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMessageSquare, FiBarChart2, FiHome, FiUser, FiCheckSquare, FiPhoneCall } from "react-icons/fi";

import Common from "@style/common"
import { css } from '@emotion/css';

const navBarStyle = css`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  max-width: ${Common.maxWidth};
  font-weight: 700;

  padding: .7em 1em;
  color: rgba(${Common.colors.text});
  background-color: rgba(${Common.colors.background});
  border-top: 1px solid rgba(${Common.colors.border});
`

const navBarItemStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  padding: .3em;
  cursor: pointer;

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
    children: 'chat',
    to: '/chat',
  },
  {
    icon: FiPhoneCall,
    children: 'call',
    to: '/call',
  },
  {
    icon: FiBarChart2,
    children: 'stat',
    to: '/stat',
  },
  {
    icon: FiHome,
    children: 'Home',
    to: '/',
  },
  {
    icon: FiCheckSquare,
    children: 'quiz',
    to: '/quiz',
  },
  {
    icon: FiUser,
    children: 'profile',
    to: '/profile',
  },
];

const NavBarItem = ({ children, icon, to }) => {
  const navigate = useNavigate();
  return (
    <div className={navBarItemStyle} onClick={() => navigate(to)}>
      {icon()}
      {/*<div className='name'>{children}</div>*/}
    </div>
  );
};

const NavBar = () => {
  return (
    <div className={navBarStyle}>
      {NavBarItemList.map((item, index) => (
        <NavBarItem key={index} {...item} />
      ))}
    </div>
  );
};

export default NavBar;
