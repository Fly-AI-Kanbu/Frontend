import { useEffect } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FiAlignJustify, FiBell, FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { css } from '@emotion/css';
import Common from "@style/common"

const quizComponentStyle = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: .5em;

  width: 100%;
  max-width: 100%;
  padding: 2em;

  color: rgba(${Common.colors.text});

  --current-viewport-width: min(100vw, ${Common.maxWidth});

  .slick-slider {
    width: 100%;
    max-width: 100%;
  }
  .slick-prev::before, .slick-next::before {
    display: none;
  }
  .slick-prev, .slick-next {
    display: none;
  }
`;

const QuizItemStyle = css`
  display: flex;
  flex-direction: column;

  padding: 5em 2em;
  border-radius: 1em;
  margin: 1.5em;
  background-color: rgba(${Common.colors.white});
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  li {
    font-size: .9em;
    font-weight: 700;
    margin: .5em 0;
    padding: .5em 1em;
    border-radius: .5em;
    cursor: pointer;
    transition: all .3s;
    background-color: rgba(${Common.colors.gray200});

    &:hover {
      background-color: rgba(${Common.colors.primary200});
    }
  }
`;

const QuizItemComponent = ({ quiz }) => {
  return (
    <div className={QuizItemStyle}>
      <h2>{quiz.question}</h2>
      <ul>
        {quiz.answerList.map((answer, index) => (
          <li key={index}>{answer}</li>
        ))}
      </ul>
    </div>
  );
}

const SlickButtonFix = ({ currentSlide, slideCount, children, ...props }) => {
  return (
    <div {...props}>{children}</div>
  );
}

export const QuizComponent = () => {
  const QuizList = [
    {
      question: '맛있는',
      answerList: ['delicious', 'angry', 'beauty', 'salty'],
    },
    {
      question: '더러운',
      answerList: ['dirty', 'clean', 'happy', 'sad'],
    },
    {
      question: '행복한',
      answerList: ['happy', 'sad', 'angry', 'delicious'],
    },
    {
      question: '슬픈',
      answerList: ['sad', 'happy', 'angry', 'delicious'],
    },
  ];

  const SliderSetting = {
    dots: false,
    centerMode: true,
    infinite: true,
    lazyLoad: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
  }

  return (
    <div className={quizComponentStyle}>
      <Slider {...SliderSetting}>
        {QuizList.map((quiz, index) => (
          <QuizItemComponent key={index} quiz={quiz} />
        ))}
      </Slider>
    </div>
  );
};
