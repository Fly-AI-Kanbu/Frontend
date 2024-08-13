import { useEffect } from 'react';
import { css } from '@emotion/css';

import Common from "@style/common"

const newsStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  width: 80%;
  gap: .5em;

  .title {
    font-size: 1em;
  }
`;

const newsItemStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  width: 100%;
  padding: .7em 1em;
  border-radius: 1em;
  background-color: ${Common.colors.text};
  color: ${Common.colors.primary};
  gap: .1em;

  .news-title {
    font-size: .9em;
    font-weight: 700;

    white-space: nowrap;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;

  }
  .news-content {
    font-size: .7em;
    font-weight: 500;
    line-height: 1.4em;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const NewsContent = [
  {
    title: "데보션 개발자들의 성장 스토리, 데보션 테크 데이",
    content: "SK텔레콤이 운영하는 개발자 소통 커뮤니티 플랫폼 ‘데보션’이 AI 기반 스터디 프로그램 ‘오픈랩(OpenLab)’의 성과를 돌아보는 ‘제6회 데보션 테크 데이’를 진행했다.",
    date: "2024-08-13",
    url: "https://news.sktelecom.com/206285"
  },
  {
    title: "SKT-노키아, 유선망 상태 AI로 모니터링한다",
    content: "SK텔레콤이 노키아와 유선망 AI 기술인 ‘파이버 센싱’을 실증 및 상용화하기 위한 업무협약을 체결했다.",
    date: "2024-08-12",
    url: "https://example.com/news2"
  },
  {
    title: "파리 올림픽 수놓은 ‘Team SK’ SKT 아마추어 스포츠 후원은 계속된다",
    content: "SK텔레콤이 후원하는 아마추어 스포츠 선수들은 이번 파리올림픽에서 금메달 2개, 은메달 2개의 성과를 거뒀다.",
    date: "2024-01-12",
    url: "https://example.com/news3"
  },
  {
    title: "SKT, 개발자 100명의 AI 성장 스토리 소개한다",
    content: "SK텔레콤이 ‘제 6회 데보션 테크 데이’를 열고 102명의 개발자가 12주 간 자발적으로 운영한 AI 기술 스터디 사례를 공유한다고 8일 밝혔다.",
    date: "2024-08-08",
    url: "https://example.com/news4"
  },
  {
    title: "SKT, 갤럭시 Z 폴드6 · Z 플립6 구매 고객에게 ‘네이버페이 포인트’ 쏜다",
    content: "SK텔레콤은 공식 온라인몰 T다이렉트샵에서 ‘갤럭시 Z 폴드6 · Z 플립6’ 구매 고객 대상으로 ’네이버페이 포인트’ 5만원 권 프로모션을 진행한다.",
    date: "2024-08-08",
    url: "https://example.com/news5"
  },
];

const NewsItem = ({ news }) => {
  return (
    <div className={newsItemStyle} onClick={() => window.location.href = news.url}>
      <div className='news-title'>
        {news.title}
      </div>
      <div className='news-content'>{news.content}</div>
    </div>
  );
}

export const NewsComponent = () => {
  return (
    <div className={newsStyle}>
      <h3 className='title'>Korean news for today</h3>
      {NewsContent.map((news, index) => (
        <NewsItem key={index} news={news} />
      ))}
    </div>
  );
};
