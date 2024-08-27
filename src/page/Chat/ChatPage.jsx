import { css } from '@emotion/css';
import { useState, useEffect, useRef } from 'react';  // useRef 추가
import { useLocation, useParams } from 'react-router-dom';  
import { useBeforeunload } from 'react-beforeunload';
import { FiSend } from 'react-icons/fi';
import Common from "@style/common";
import HeaderDummy from "@components/HeaderDummy";
import NavBarDummy from '@components/NavBarDummy';

const chatPageStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100vh;

  .chat-log-list {
    padding: 1em;
    display: flex;
    flex-direction: column;
    gap: .5em;
    flex-grow: 1;
    min-height: 0;

    overflow-y: auto;  /* 스크롤 가능하게 변경 */
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
    const dateObj = new Date(date); // 시간 형식이 깨지지 않도록 올바르게 파싱
    if (isNaN(dateObj)) return '';  // 시간 데이터가 잘못된 경우 빈 문자열 반환
    const hour = ("0" + dateObj.getHours()).slice(-2);
    const minute = ("0" + dateObj.getMinutes()).slice(-2);
    return `${hour}:${minute}`;
  };

  return (
    <div className={chatListItemComponentStyle} style={{ flexDirection: isUser ? 'row-reverse' : '' }}>
      <div className="chat-content" style={{ backgroundColor: isUser ? `rgba(${Common.colors.primary100}, 0.3)` : '' }}>
        {content}
      </div>
      <div className="chat-time">{dateToChatTime(time)}</div>
    </div>
  );
};


export const ChatPage = () => {
  const { state } = useLocation();
  const { chat_id: paramChatId } = useParams();
  const chat_id = state?.chat_id || paramChatId;

  const [chatLog, setChatLog] = useState([]);
  const [input, setInput] = useState('');
  
  const chatLogRef = useRef(null);  // chat-log-list 요소에 대한 ref 추가

  const finishChat = async () => {
    try {
      await fetch(`http://127.0.0.1:8000/chat/${chat_id}/finish-chat`, {
        method: 'PUT',
      });
      console.log('Chat finished');
    } catch (error) {
      console.error('Error finishing chat:', error);
    }
  };

  useBeforeunload(() => {
    console.log("Before unload - finishing chat...");
    finishChat();
  });

  // 메시지가 추가될 때마다 자동으로 아래로 스크롤하는 로직
  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [chatLog]);  // chatLog가 변경될 때마다 호출


  useEffect(() => {
    if (state?.firstMessage) {
      const firstMessage = state.firstMessage;
    
      const answerPart = firstMessage.match(/답변:\s*"([^"]*)"/);
      const pronunciationPart = firstMessage.match(/발음:\s*"([^"]*)"/);
      const translationPart = firstMessage.match(/번역:\s*"([^"]*)"/);
    
      const answer = answerPart ? answerPart[1] : firstMessage;
      const pronunciation = pronunciationPart ? pronunciationPart[1] : '';
      const translation = translationPart ? translationPart[1] : '';
    
      setChatLog([{
        content: (
          <>
            {answer}
            {translation && (
              <>
                <br /><br />{translation}
              </>
            )}
            {pronunciation && (
              <>
                <br /><br />{pronunciation}
              </>
            )}
          </>
        ),
        time: new Date().toISOString(),
        isUser: false,
      }]);
    }
    else {
      const fetchChatLog = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/chat/${chat_id}/get_chat_log`);
          const data = await response.json();
    
          const formattedLog = data.map(chat => {
            const answerMatch = chat.content.match(/답변:\s*"([^"]*)"/);
            const pronunciationMatch = chat.content.match(/발음:\s*"([^"]*)"/);
            const translationMatch = chat.content.match(/번역:\s*"([^"]*)"/);
    
            const answer = answerMatch ? answerMatch[1] : chat.content;
            const pronunciation = pronunciationMatch ? pronunciationMatch[1] : '';
            const translation = translationMatch ? translationMatch[1] : '';
    
            return {
              content: (
                <>
                  {answer}
                  {translation && (
                    <>
                      <br />
                      <br />
                      {translation}
                    </>
                  )}
                  {pronunciation && (
                    <>
                      <br />
                      <br />
                      {pronunciation}
                    </>
                  )}
                </>
              ),
              time: chat.created_time,
              isUser: chat.is_human
            };
          });
    
          setChatLog(formattedLog);
        } catch (error) {
          console.error('Error fetching chat log:', error);
        }
      };
    
      fetchChatLog();
    }
    return () => {
      console.log("Component unmounted - finishing chat...");
      finishChat();
    };
  }, [chat_id, state]);


  const handleSend = async () => {
    if (!chat_id) {
      console.error("chat_id is undefined");
      return;
    }
  
    if (!input.trim()) {
      console.error("Cannot send an empty message");
      return;
    }
  
    const newChatLog = [...chatLog];
    newChatLog.push({
      content: input,
      time: new Date().toISOString(),
      isUser: true,
    });
    setChatLog(newChatLog);
    setInput('');
  
    try {
      console.log("Sending message:", input);
  
      const response = await fetch(`http://127.0.0.1:8000/chat/${chat_id}/send_chat_message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: input }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
  
      const data = await response.json();
      const botReply = data.content;
  
      const answerMatch = botReply.match(/답변:\s*"([^"]*)"/);
      const pronunciationMatch = botReply.match(/발음:\s*"([^"]*)"/);
      const translationMatch = botReply.match(/번역:\s*"([^"]*)"/);
  
      const answer = answerMatch ? answerMatch[1] : botReply;
      const pronunciation = pronunciationMatch ? pronunciationMatch[1] : '';
      const translation = translationMatch ? translationMatch[1] : '';
  
      setChatLog(prevLog => [
        ...prevLog,
        {
          content: (
            <>
              {answer}
              {translation && (
                <>
                  <br />
                  <br />
                  {translation}
                </>
              )}
              {pronunciation && (
                <>
                  <br />
                  <br />
                  {pronunciation}
                </>
              )}
            </>
          ),
          time: new Date().toISOString(),
          isUser: false,
        }
      ]);
  
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };
  
  return (
    <div className={chatPageStyle}>
      <HeaderDummy />
      <div className='chat-log-list' ref={chatLogRef}>  {/* chat-log-list에 ref 추가 */}
        {chatLog.map((chat, index) => (
          <ChatItemComponent key={index} content={chat.content} time={chat.time} isUser={chat.isUser} />
        ))}
      </div>
      <div className={chatInputComponentStyle}>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} />
        <button onClick={handleSend}>
          <FiSend />
        </button>
      </div>
      <NavBarDummy />
    </div>
  );
};
