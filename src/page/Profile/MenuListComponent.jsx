import { css } from '@emotion/css';
import { useEffect, useState } from 'react';

import Common from "@style/common"

const mainPageStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  & > * {
    border-top: 1px solid rgba(${Common.colors.border});
  }
`;

const menuItemStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  width: 100%;
  padding: 1em 2em;

  font-size: 1em;
  font-weight: 700;
  color: rgba(${Common.colors.text});

  cursor: pointer;
  transition: all .3s;

  &:hover {
    background-color: rgba(${Common.colors.border})
  }

`;

const getUserId = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('test-user-id');
    }, 0);
  });
}

const UserIdItemComponent = () => {
  const [userId, setUserId] = useState('');

  useEffect(() => {
    getUserId().then((userId) => {
      setUserId(userId);
    });
  }, []);

  return (
    <div className={menuItemStyle}>
      ID: {userId}
    </div>
  );
}

const MenuListItemComponent = ({ item }) => {
  return (
    <div className={menuItemStyle}>
      {item}
    </div>
  );
}


export const MenuListComponent = () => {
  const MenuList = [
    '비번 변경',
    '국가 변경',
    '결제 정보',
    'FAQ',
    '로그아웃',
  ];

  return (
    <div className={mainPageStyle}>
      <UserIdItemComponent />
      {MenuList.map((item, index) => (
        <MenuListItemComponent key={index} item={item} />
      ))}
    </div>
  );
};
