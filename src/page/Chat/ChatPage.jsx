import { css } from '@emotion/css';
import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';  // useLocation과 useParams 훅 사용
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


  useEffect(() => {
    if (state?.firstMessage) {
      const firstMessage = state.firstMessage;
    
      // 답변, 발음, 번역을 분리
      const answerPart = firstMessage.match(/답변:\s*"([^"]*)"/);
      const pronunciationPart = firstMessage.match(/발음:\s*"([^"]*)"/);
      const translationPart = firstMessage.match(/번역:\s*"([^"]*)"/);
    
      const answer = answerPart ? answerPart[1] : firstMessage;
      const pronunciation = pronunciationPart ? pronunciationPart[1] : '';
      const translation = translationPart ? translationPart[1] : '';
    
      // 첫 메시지는 GPT의 응답이므로 isUser는 false로 설정
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
        isUser: false,  // GPT 메시지로 설정
      }]);
    }
    else {
      const fetchChatLog = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/chat/${chat_id}/get_chat_log`);
          const data = await response.json();
    
          // 로그를 상태에 저장하면서 답변, 발음, 번역을 분리
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
              isUser: chat.is_human // is_human이 true면 사용자 메시지로 처리
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
  
    // Send user message to chat log locally
    const newChatLog = [...chatLog];
    newChatLog.push({
      content: input,
      time: new Date().toISOString(),
      isUser: true,
    });
    setChatLog(newChatLog);
    setInput('');  // Clear the input field
  
    try {
      // Debugging: Check the content being sent to the server
      console.log("Sending message:", input);
  
      const response = await fetch(`http://127.0.0.1:8000/chat/${chat_id}/send_chat_message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: input }),  // Send the message to the backend
      });
  
      // Check if the response is OK
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
  
      const data = await response.json();
      const botReply = data.content;
  
      // Extract and parse the bot's reply (answer, pronunciation, translation)
      const answerMatch = botReply.match(/답변:\s*"([^"]*)"/);
      const pronunciationMatch = botReply.match(/발음:\s*"([^"]*)"/);
      const translationMatch = botReply.match(/번역:\s*"([^"]*)"/);
  
      const answer = answerMatch ? answerMatch[1] : botReply;
      const pronunciation = pronunciationMatch ? pronunciationMatch[1] : '';
      const translation = translationMatch ? translationMatch[1] : '';
  
      // Add bot's reply to chat log
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
          isUser: false,  // Set bot message
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
      <div className='chat-log-list'>
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
