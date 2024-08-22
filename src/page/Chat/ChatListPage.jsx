import { css } from '@emotion/css';
import { useNavigate } from 'react-router-dom';
import { FiPlusCircle } from "react-icons/fi";

import Common from "@style/common"
import HeaderDummy from "@components/HeaderDummy";
import NavBarDummy from '@components/NavBarDummy';

const chatListPageStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  .new-chat {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    padding: 1.3em;

    font-size: 1.1em;
    font-weight: 700;
    color: rgba(${Common.colors.primary400});

    cursor: pointer;

    /*background-color: rgba(${Common.colors.primary100});*/
    border-bottom: 1px solid rgba(${Common.colors.border});
    transition: all .3s;

    &:hover {
      background-color: rgba(${Common.colors.primary100}, 0.3);
    }
  }
`;

const chatListItemComponentStyle = css`
  display: flex;
  flex-direction: column;

  width: 100%;
  padding: 1em;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  color: rgba(${Common.colors.text});

  cursor: pointer;
  transition: all .3s;
  &:hover {
    background-color: rgba(${Common.colors.primary100}, 0.3);
  }

  .chat-intro {
    font-size: 1em;
    font-weight: 600;

    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .chat-time {
    font-size: 0.8em;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.5);
  }
`;

const ChatListItemComponent = ({ chat }) => {
  const navigate = useNavigate();
  const elapsedTime = (date) => {
    const start = new Date(date);
    const end = new Date();

    const seconds = Math.floor((end.getTime() - start.getTime()) / 1000);
    if (seconds < 60) return '방금 전';

    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;

    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;

    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;

    return `${start.toLocaleDateString()}`;
  };

  return (
    <div className={chatListItemComponentStyle} onClick={() => {navigate(chat.id)}}>
      <div className="chat-intro">{chat.intro}</div>
      <div className="chat-time">{elapsedTime(chat.time)}</div>
    </div>
  );
}

export const ChatListPage = () => {
  const ChatList = [
    {
      intro: '안녕하세요? 오늘은 좋아하는 음식에 대해 말해보기로 해요.',
      time: new Date("2024-08-20T10:00:00"),
      id: '1',
    },
    {
      intro: '오늘의 주제는 가장 좋아하는 색깔이에요.',
      time: new Date("2024-08-19T10:00:00"),
      id: '2',
    },
    {
      intro: '오늘은 가장 좋아하는 동물에 대해 이야기해보는 시간을 가져볼까요?',
      time: new Date("2024-08-18T10:00:00"),
      id: '3',
    },
    {
      intro: '안녕하세요? 오늘은 가장 좋아하는 계절에 대해 이야기해보는 시간을 가져볼까요?',
      time: new Date("2024-08-17T10:00:00"),
      id: '4',
    },
    {
      intro: '좋은 아침이에요. 오늘은 가장 좋아하는 계절에 대해 이야기해보는 시간을 가져볼까요?',
      time: new Date("2024-08-17T10:00:00"),
      id: '5',
    },

    {
      intro: '안녕하세요? 오늘은 좋아하는 음식에 대해 말해보기로 해요.',
      time: new Date("2024-08-20T10:00:00"),
      id: '6',
    },
    {
      intro: '오늘의 주제는 가장 좋아하는 색깔이에요.',
      time: new Date("2024-08-19T10:00:00"),
      id: '7',
    },
    {
      intro: '오늘은 가장 좋아하는 동물에 대해 이야기해보는 시간을 가져볼까요?',
      time: new Date("2024-08-18T10:00:00"),
      id: '8',
    },
    {
      intro: '안녕하세요? 오늘은 가장 좋아하는 계절에 대해 이야기해보는 시간을 가져볼까요?',
      time: new Date("2024-08-17T10:00:00"),
      id: '9',
    },
    {
      intro: '좋은 아침이에요. 오늘은 가장 좋아하는 계절에 대해 이야기해보는 시간을 가져볼까요?',
      time: new Date("2024-08-17T10:00:00"),
      id: '10',
    },

  ];
  return (
    <div className={chatListPageStyle}>
      <HeaderDummy />
      <div className='new-chat'>
        새로운 채팅을 시작해 보세요&nbsp;<FiPlusCircle />
      </div>
      {ChatList.map((chat, index) => (
        <ChatListItemComponent key={index} chat={chat} />
      ))}
      <NavBarDummy />
    </div>
  );
};
