import { css } from '@emotion/css';

import HeaderDummy from "@components/HeaderDummy";
import { UserInfoComponent } from './UserInfoComponent';
import { MenuListComponent } from './MenuListComponent';
import NavBarDummy from '../../components/NavBarDummy';

const profilePageStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
`;

export const ProfilePage = () => {
  return (
    <div className={profilePageStyle}>
      <HeaderDummy />
      <UserInfoComponent />
      <MenuListComponent />
      <NavBarDummy />
    </div>
  );
};
