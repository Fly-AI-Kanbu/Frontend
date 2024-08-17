import { useEffect } from 'react';

import { css } from '@emotion/css';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  RadialLinearScale,
  scales
} from 'chart.js';

import Common from "@style/common"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
);

const statChartComponentStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: .5em;

  width: 90%;
  padding: 1em;
  /*border-bottom: 1px solid rgba(${Common.colors.border});*/
  background-color: rgba(${Common.colors.gray300}, 0.8);
  box-shadow: 4px 4px 12px rgba(${Common.colors.gray800}, 0.3);

  margin: 2em;
  border-radius: 2em;

  .stat-classifier {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1em;

    .my-stat {
      width: 6em;
      text-align: center;
      font-size: 1em;
      font-weight: 700;
      color: rgba(${Common.colors.text});
      padding: .5em 1em;
      border-radius: 1em;
      background-color: rgba(${Common.colors.primary300}, 0.5);
    }
    .avg-stat {
      width: 6em;
      text-align: center;
      font-size: 1em;
      font-weight: 700;
      color: rgba(${Common.colors.text});
      padding: .5em 1em;
      border-radius: 1em;
      background-color: rgba(${Common.colors.gray500}, 0.5);
    }
  }
`;

export const StatChartComponent = () => {
  const UserStat = {
    '어휘력': 90,
    '정확성': 70,
    '유사성': 65,
    '발음': 90,
    '유창성': 30,
    '이해력': 35,
  }
  const AvgStat = {
    '어휘력': 50,
    '정확성': 60,
    '유사성': 70,
    '발음': 80,
    '유창성': 70,
    '이해력': 60,
  }

  return (
    <div className={statChartComponentStyle}>
      <div className='stat-classifier'>
        <span className='my-stat'>내 성적</span>
        <span className='avg-stat'>평균 성적</span>
      </div>
      <Radar data={{
        labels: Object.keys(UserStat),
        datasets: [
          {
            label: 'User Stat',
            data: Object.values(UserStat),
            fill: true,
            backgroundColor: `rgba(${Common.colors.primary300}, 0.5)`,
            borderColor: `rgb(${Common.colors.primary300})`,
            pointBackgroundColor: `rgb(${Common.colors.primary300})`,
          },
          {
            label: 'Avg Stat',
            data: Object.values(AvgStat),
            fill: true,
            backgroundColor: `rgba(${Common.colors.gray500}, 0.5)`,
            borderColor: `rgb(${Common.colors.gray500})`,
            pointBackgroundColor: `rgb(${Common.colors.gray500})`,
          }
        ],
      }} options={{
        scales: {
          r: {
            min: 0,
            max: 100,
            ticks: {
              display: false,
            }
          },

        }
      }}
      />
    </div>
  );
};
