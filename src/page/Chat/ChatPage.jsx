import { css } from '@emotion/css';
import { useEffect, useState } from 'react';

import Common from "@style/common"
import HeaderDummy from "@components/HeaderDummy";
import NavBarDummy from '@components/NavBarDummy';
import { FiSend } from 'react-icons/fi';

const chatPageStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100vh;

  .chat-log-list {
    padding: 1em;;
    display: flex;
    flex-direction: column;
    gap: .5em;
    flex-grow: 1;
    min-height: 0;

    overflow: scroll;
  }
`;

const chatListItemComponentStyle = css`
  display: flex;
  flex-direction: row;
  align-items: flex-end;

  color: rgba(${Common.colors.text});

  width: 100%;
  .chat-content {
    display: flex;
    width: fit-content;
    /*width: max-content;*/


    flex-wrap: wrap;
    padding: .7em 1em;
    font-size: .9em;
    font-weight: 500;

    background-color: rgba(${Common.colors.gray300}, 0.7);
    border-radius: 1em;
  }

  .chat-time {
    font-size: .6em;
    font-weight: 300;
    color: rgba(${Common.colors.text}, 0.7);
  }
`;

const chatInputComponentStyle = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 1em;

  input {
    flex-grow: 1;
    padding: .5em;
    font-size: .9em;
    font-weight: 500;
    border: 1px solid rgba(${Common.colors.border});
    border-radius: 1em;

    background-color: rgba(${Common.colors.gray300});
    color: rgba(${Common.colors.text});

    outline: none;
  }
  button {
    padding: .5em 1em;
    font-size: 1em;
    font-weight: 700;
    color: rgba(${Common.colors.text});
    background-color: rgba(${Common.colors.primary100}, 0.6);
    border: none;
    border-radius: 1em;
    margin-left: .5em;
    cursor: pointer;

    svg {
      transform: translateY(2px);
    }
  }
`;

const ChatItemComponent = ({ content, time, isUser }) => {
  const dateToChatTime = (date) => {
    const dateObj = new Date(date);
    const hour = ("0" + dateObj.getHours()).slice(-2);
    const minute = ("0" + dateObj.getMinutes()).slice(-2);
    return `${hour}:${minute}`;
  }

  return (
    <div className={chatListItemComponentStyle} style={{flexDirection: isUser ? 'row-reverse' : ''}}>
      <div className="chat-content" style={{backgroundColor: isUser ? `rgba(${Common.colors.primary100}, 0.3)` : ''}}>{content}</div>
      <div className="chat-time">{dateToChatTime(time)}</div>
    </div>
  );
}

export const ChatPage = () => {
  const [chatLog, setChatLog] = useState([
    {
      content: '안녕하세요? 오늘은 좋아하는 음식에 대해 말해보기로 해요.',
      time: '2021-09-01T09:00:00',
      isUser: false,
    },
    {
      content: '나 좋아해 노루궁뎅이버섯',
      time: '2021-09-01T09:30:00',
      isUser: true,
    },
    {
      content: '나는 노루궁뎅이버섯이 좋아가 맞는 표현이에요. 그게 왜 좋은가요?',
      time: '2021-09-01T10:00:00',
      isUser: false,
    },
    {
      content: '알빠노?',
      time: '2021-09-01T10:30:00',
      isUser: true,
    },
  ]);

  const [input, setInput] = useState('');

  const handleInputEnter = (e) => {
    if(e.key === 'Enter') {
      handleSend();
    }
  }

  const handleInput = (e) => {
    console.log(e.target);
    setInput(e.target.value);
  }

  const handleSend = () => {
    console.log(input); // TODO: Send input to server

    const newChatLog = chatLog.slice();
    newChatLog.push({
      content: input,
      time: new Date().toISOString(),
      isUser: true,
    });
    setChatLog(newChatLog);
    setInput('');
  }

  useEffect(() => {
    const chatLogList = document.querySelector('.chat-log-list');
    chatLogList.scrollTop = chatLogList.scrollHeight;
  }, [chatLog]);

  return (
    <div className={chatPageStyle}>
      <HeaderDummy />
      <div className='chat-log-list'>
        {chatLog.map((chat, index) => (
          <ChatItemComponent key={index} content={chat.content} time={chat.time} isUser={chat.isUser} />
        ))}
      </div>
      <div className={chatInputComponentStyle}>
        <input type="text" value={input} onChange={handleInput} onKeyDown={handleInputEnter}/>
        <button onClick={handleSend}>
          <FiSend />
        </button>
      </div>

      <NavBarDummy />
    </div>
  );
};
