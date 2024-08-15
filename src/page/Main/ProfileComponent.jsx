import { useEffect } from 'react';

import { css } from '@emotion/css';
import Common from "@style/common"

const rankStyle = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: .5em;

  width: 100%;
  padding: 1em 1em 0;

  background-color: rgba(${Common.colors.primary300});

  img {
    width: 3.5em;
    height: 3.5em;

    border-radius: 50%;
    border: 2px solid rgba(${Common.colors.text});
  }

  .profile {
    display: flex;
    flex-direction: column;

    font-size: 1em;
    font-weight: 800;
    color: rgba(${Common.colors.text});

    .name {
      font-size: 1em;
      font-weight: 800;
    }
    .league-rank {
      display: inline-block;
      background-color: rgba(0, 0, 0, 0.1);
      width: max-content;
      padding: .3em .5em;
      border-radius: .5em;
      font-size: .7em;
    }

  }
`;

export const ProfileComponent = () => {
  const UserName = "압둘 알리 뚬양꿍";

  return (
    <div className={rankStyle}>
      <img src="data:image/png;base64,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" alt="" />
      <div className='profile'>
        <div className='name'>{UserName}님</div>
        <div className='league-rank'>현재 리그 순위 | <span>4th</span></div>
      </div>
    </div>
  );
};
