import { useEffect, useState, useRef } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { css } from '@emotion/css';
import Common from "@style/common";

const quizComponentStyle = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: .5em;

  width: 100%;
  max-width: 100%;
  padding: 2em;

  color: rgba(${Common.colors.text});

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

// 동적 스타일 함수
const getFeedbackStyle = (isCorrect) => css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 1000;
  padding: 1em;
  border-radius: 1em;
  background-color: ${isCorrect ? 'rgba(144, 238, 144, 0.8)' : 'rgba(255, 99, 71, 0.8)'};

  .feedback-emoji {
    font-size: 5em;
  }

  .feedback-text {
    font-size: 1.5em;
    margin-top: 0.5em;
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

const QuizItemComponent = ({ quiz, onSelectAnswer }) => {
  return (
    <div className={QuizItemStyle}>
      <h2>{quiz.question}</h2>
      <ul>
        {quiz.answerList.map((answer, index) => (
          <li key={index} onClick={() => onSelectAnswer(quiz.quiz_id, answer)}>
            {answer}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const QuizComponent = () => {
  const [quizList, setQuizList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [isCorrect, setIsCorrect] = useState(null); // 정답 여부 상태 추가
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchQuizList = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/quiz-list');
        const data = await response.json();
        const formattedQuizList = data.map(quiz => ({
          quiz_id: quiz.voca_id,
          question: quiz.korean,
          answerList: quiz.options
        }));
        setQuizList(formattedQuizList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
        setLoading(false);
      }
    };
    fetchQuizList();
  }, []);

  const handleAnswer = async (quiz_id, selected_answer) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/check-answer/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: 1,
          voca_id: quiz_id,
          selected_answer: selected_answer,
        }),
      });
      const result = await response.json();

      if (result.is_correct) {
        setFeedback('✅');
        setFeedbackText('맞았습니다!');
        setIsCorrect(true); // 맞으면 true
        setTimeout(() => {
          sliderRef.current.slickNext(); // 다음 퀴즈로 이동
          setFeedback(null);
          setFeedbackText('');
          setIsCorrect(null); // 초기화
        }, 500);
      } else {
        setFeedback('😢');
        setFeedbackText('틀렸습니다!');
        setIsCorrect(false); // 틀리면 false
        setTimeout(() => {
          setFeedback(null);
          setFeedbackText('');
          setIsCorrect(null); // 초기화
        }, 500);
      }
    } catch (error) {
      console.error('Error checking answer:', error);
    }
  };

  const SliderSetting = {
    dots: false,
    centerMode: true,
    infinite: true,
    lazyLoad: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: false,
    draggable: false,
    arrows: false,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={quizComponentStyle}>
      <Slider {...SliderSetting} ref={sliderRef}>
        {quizList.map((quiz, index) => (
          <QuizItemComponent key={index} quiz={quiz} onSelectAnswer={handleAnswer} />
        ))}
      </Slider>

      {feedback && (
        <div className={getFeedbackStyle(isCorrect)}>
          <div className="feedback-emoji">{feedback}</div>
          <div className="feedback-text">{feedbackText}</div>
        </div>
      )}
    </div>
  );
};
