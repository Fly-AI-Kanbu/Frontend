import { useEffect, useState } from 'react';
import { css } from '@emotion/css';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, RadialLinearScale } from 'chart.js';
import Common from "@style/common";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, RadialLinearScale);

const statChartComponentStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: .5em;

  width: 90%;
  padding: 1em;
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
  const [userStat, setUserStat] = useState({
    복잡성: 0,
    건전성: 0,
    유창성: 0,
    어휘력: 0,
    정확성: 0,
    적절성: 0,
  });

  const [avgStat, setAvgStat] = useState({
    복잡성: 30,
    건전성: 70,
    유창성: 65,
    어휘력: 30,
    정확성: 59,
    적절성: 40,
  });

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/user/1/koability');
        const data = await response.json();
        // 데이터를 UserStat 형식으로 변환
        const formattedUserStat = {
          복잡성: data.complexity,
          건전성: data.toxicity,
          유창성: data.fluency,
          어휘력: data.vocabulary,
          정확성: data.accuracy,
          적절성: data.context_score,
        };
        setUserStat(formattedUserStat);
      } catch (error) {
        console.error("Error fetching user stats:", error);
      }
    };

    fetchUserStats();
  }, []);

  return (
    <div className={statChartComponentStyle}>
      <div className='stat-classifier'>
        <span className='my-stat'>내 성적</span>
        <span className='avg-stat'>평균 성적</span>
      </div>
      <Radar
        data={{
          labels: Object.keys(userStat),
          datasets: [
            {
              label: 'User Stat',
              data: Object.values(userStat),
              fill: true,
              backgroundColor: `rgba(${Common.colors.primary300}, 0.5)`,
              borderColor: `rgb(${Common.colors.primary300})`,
              pointBackgroundColor: `rgb(${Common.colors.primary300})`,
            },
            {
              label: 'Avg Stat',
              data: Object.values(avgStat),
              fill: true,
              backgroundColor: `rgba(${Common.colors.gray500}, 0.5)`,
              borderColor: `rgb(${Common.colors.gray500})`,
              pointBackgroundColor: `rgb(${Common.colors.gray500})`,
            },
          ],
        }}
        options={{
          scales: {
            r: {
              min: 0,
              max: 100,
              ticks: {
                display: false,
              },
            },
          },
        }}
      />
    </div>
  );
};
