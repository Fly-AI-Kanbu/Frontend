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
    font-size: .7em;
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
      type: '복잡성',
      description: 'grammatical structure and lexical diversity' 
    },
    {
      type: '적절성',
      description: 'providing correct answers to questions' 
    },
    {
      type: '건전성',
      description: 'using non-discriminatory and non-offensive language' 
    },
    {
      type: '정확성',
      description: 'sentence proficiency compared to that of a native speaker'
    },
    {
      type: '유창성',
      description: 'Linguistic proficiency in sentence composition' 
    },
    {
      type: '어휘력',
      description: 'The ability to comprehend and use vocabulary'
    }
  ]

  return (
    <div className={statDescriptionComponentStyle}>
      {StatDescription.map(stat => <StatDescriptionItemComponent stat={stat} />)}
    </div>
  );
};
