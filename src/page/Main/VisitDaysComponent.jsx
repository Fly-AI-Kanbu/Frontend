import { css } from '@emotion/css';
import { useEffect, useState } from 'react';
import { FiBold, FiCheck } from "react-icons/fi";

import Common from '../../style/common';

const visitDaysStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  background-color: rgba(${Common.colors.background});
  color: rgba(${Common.colors.text});

  padding: 1em;
  width: 100%;
  gap: .2em;

  .title {
    font-size: 1em;
  }
  .days {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    padding: .3em 1em;
    border-radius: 1em;
  }

  .visit-days {
    display: inline-block;
    text-align: center;
    width: 100%;

    font-size: .8em;
    font-weight: 500;
    color: rgba(${Common.colors.text});

    span {
      font-weight: 800;
      color: rgba(${Common.colors.primary800})
    }
  }
`;

const dayStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-weight: 900;

  padding: .5em;
  border-radius: .5em;
  font-size: .8em;
  width: 12%;

  .check-in-box {
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 50%;

    background-color: rgba(${Common.colors.primary800}, 0.2);
  }
  .check-in-true {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    background-color: rgba(${Common.colors.primary300});
    color: rgba(${Common.colors.text});
  }
`;


const checkInData = [
  { day: '일', checkedIn: true },
  { day: '월', checkedIn: true },
  { day: '화', checkedIn: true },
  { day: '수', checkedIn: true },
  { day: '목', checkedIn: true },
  { day: '금', checkedIn: true },
  { day: '토', checkedIn: false },
];

const CheckInStatus = ({ day, checkedIn }) => {
  return (
    <div className={dayStyle} style={
      day === new Date().toLocaleDateString(undefined, { weekday: 'short' }) ? { backgroundColor: `rgba(${Common.colors.primary200})` } : {}
    }>
      <span>{day}</span>
      {checkedIn ?
      <div className='check-in-box check-in-true'>
        <FiCheck size={10} strokeWidth={4}/>
      </div> :
      <div className='check-in-box check-in-false'></div>}
    </div>
  );
};

export const VisitDaysComponent = () => {
  const [visitDays, setVisitDays] = useState(1);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Calculate the number of visit days based on checkInData
    const numVisitDays = checkInData.filter((data) => data.checkedIn).length;
    setVisitDays(numVisitDays);

    // Get the current date
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(today.toLocaleDateString(undefined, options));
  }, []);

  return (
    <div className={visitDaysStyle}>
      <h3 className='title'>attendance streak</h3>
      <div className='days'>
      {checkInData.map((data) => (
        <CheckInStatus key={data.day} day={data.day} checkedIn={data.checkedIn} />
      ))}
      </div>
      <h4 className='visit-days'>현재 <span>{visitDays}일</span> 연속 출석하셨습니다.</h4>
    </div>
  );
};
