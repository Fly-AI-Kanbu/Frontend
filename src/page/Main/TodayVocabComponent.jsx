import { useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { css } from '@emotion/css';
import Common from "@style/common"

const todayVocabStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  width: 80%;
  gap: .2em;

  .title {
    font-size: 1em;
  }
  .vocab-slide {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1em;

    width: 100%;
    padding: 1em;
    background-color: ${Common.colors.text};
    color: ${Common.colors.primary};
    border-radius: 1em;

    .vocab {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: .5em;

      font-size: 1em;
      font-weight: 700;
    }

    .button {
      font-size: 1.5em;
      cursor: pointer;
    }
  }
`;

export const TodayVocabComponent = () => {
  const todayVocab = [
    ['GitHub', '깃허브'],
    ['Copilot', '코파일럿'],
    ['JavaScript', '자바스크립트'],
    ['React', '리액트'],
    ['Component', '컴포넌트'],
    ['Suicide', '자살'],
  ];

  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    // Your code here
  }, []);

  // Function to handle next word
  const handleNextWord = () => {
    setCurrentWordIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex >= todayVocab.length ? 0 : nextIndex;
    });
  };

  // Function to handle previous word
  const handlePreviousWord = () => {
    setCurrentWordIndex((prevIndex) => {
      const nextIndex = prevIndex - 1;
      return nextIndex < 0 ? todayVocab.length - 1 : nextIndex;
    });
  };

  return (
    <div className={todayVocabStyle}>
      <h3 className='title'>Today's Vocabulary</h3>
      {/* Vocab Slide list */}
      <div className='vocab-slide'>
        <FiChevronLeft className='button' onClick={handlePreviousWord}/>
        <div className='vocab'>{todayVocab[currentWordIndex][0]} - {todayVocab[currentWordIndex][1]}</div>
        <FiChevronRight className='button' onClick={handleNextWord}/>
      </div>

    </div>
  );
};
