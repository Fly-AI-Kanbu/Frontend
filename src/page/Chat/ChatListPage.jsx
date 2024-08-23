import { css } from '@emotion/css';
import { useNavigate } from 'react-router-dom';
import { FiPlusCircle } from "react-icons/fi";
import { useState, useEffect } from 'react'; 
import Common from "@style/common";
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
  const elapsedTime = (dateString) => {
    const start = new Date(dateString);  // 날짜 형식 변환
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
    <div className={chatListItemComponentStyle} onClick={() => navigate(`/chat/${chat.chat_id}`, { 
      state: { chat_id: chat.chat_id } })}>
      <div className="chat-intro">{chat.subject_name}</div>
      <div className="chat-time">{elapsedTime(chat.chat_time)}</div>
    </div>
  );
}

export const ChatListPage = () => {
  const [chatList, setChatList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleCreateChat = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/user/1/create-chat', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error("Failed to create chat");
      }

      const data = await response.json();
      const newChatId = data.chat_id;
      const firstMessage = data.first_message;
      const subjectName = data.subject_name;

      navigate(`/chat/${newChatId}`, { 
        state: { 
          chat_id: newChatId, 
          firstMessage: firstMessage,
          subjectName 
        } 
      });
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  useEffect(() => {
    const fetchChatList = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/user/1/get-chat-list');
        const data = await response.json();

        // 데이터를 역순으로 정렬합니다.
        const sortedChatList = data.sort((a, b) => new Date(b.chat_time) - new Date(a.chat_time));

        setChatList(sortedChatList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching chat list:", error);
        setLoading(false);
      }
    };

    fetchChatList();
  }, []);

  return (
    <div className={chatListPageStyle}>
      <HeaderDummy />
      <div className='new-chat' onClick={handleCreateChat}>
        새로운 채팅을 시작해 보세요&nbsp;<FiPlusCircle />
      </div>
      {chatList.map((chat, index) => (
        <ChatListItemComponent key={index} chat={chat} />
      ))}
      <NavBarDummy />
    </div>
  );
};