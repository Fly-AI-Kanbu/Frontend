import { css } from '@emotion/css';

const mainPageStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
`;

export const ProfilePage = () => {
  return (
    <div className={mainPageStyle}>
      Profile Page
    </div>
  );
};
