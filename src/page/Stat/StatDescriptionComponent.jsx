import { useEffect } from 'react';

import { css } from '@emotion/css';
import Common from "@style/common"

const statDescriptionComponentStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: .5em;

  width: 100%;
  padding: 1em;
  color: rgba(${Common.colors.text});

`;

const statDescriptionItemStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  width: 100%;
  border-radius: 1em;

  .stat-type {
    width: 4em;
    text-align: center;
    font-size: 1em;
    font-weight: 700;
    color: rgba(${Common.colors.text});
    padding: .4em .7em;
    border-radius: 1em;
    background-color: rgba(${Common.colors.primary300}, 0.5);
    margin-right: .5em;
  }
  .stat-description {
    font-size: .9em;
    font-weight: 700;
    color: rgba(${Common.colors.text}, 0.7);
  }
`;

const StatDescriptionItemComponent = ({ stat }) => {
  return (
    <div className={statDescriptionItemStyle}>
      <div className="stat-type">{stat.type}</div>
      <div className="stat-description">{stat.description}</div>
    </div>
  );
}

export const StatDescriptionComponent = () => {
  const StatDescription = [
    {
      type: '어휘력',
      description: '단어를 이해하고 사용하는 능력'
    },
    {
      type: '정확성',
      description: '문법적인 오류 없이 말하고 쓰는 능력'
    },
    {
      type: '유사성',
      description: '단어와 문장을 비교하고 구분하는 능력'
    },
    {
      type: '발음',
      description: '발음이 명확하고 자연스러운 능력'
    },
    {
      type: '유창성',
      description: '말하는 속도와 유창함'
    },
    {
      type: '이해력',
      description: '듣거나 읽은 것을 이해하는 능력'
    }
  ]

  return (
    <div className={statDescriptionComponentStyle}>
      {StatDescription.map(stat => <StatDescriptionItemComponent stat={stat} />)}
    </div>
  );
};
