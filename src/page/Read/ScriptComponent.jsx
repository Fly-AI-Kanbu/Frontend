import { css } from '@emotion/css';

import Common from "@style/common"
const scriptComponentStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1em;

  .line {
    margin-bottom: 1.5em; /* 각 구절 사이의 간격을 일정하게 설정 */
  }

  .korean, .english, .romanized {
    display: block; /* 각 줄을 강제로 블록 요소로 만들어 줄바꿈 */
    margin-bottom: 0.5em; /* 각 라인 간의 간격 설정 */
    white-space: pre-wrap; /* 공백과 줄바꿈을 정확하게 유지 */
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

const ChatItemComponent = ({ content, isUser }) => {
  const dateToChatTime = (date) => {
    const dateObj = new Date(date);
    const hour = ("0" + dateObj.getHours()).slice(-2);
    const minute = ("0" + dateObj.getMinutes()).slice(-2);
    return `${hour}:${minute}`;
  }

  return (
    <div 
      className={chatListItemComponentStyle} 
      style={{
        flexDirection: isUser ? 'row-reverse' : '', 
        alignItems: 'flex-start' // 텍스트가 여러 줄일 경우 상단 정렬을 유지
      }}
    >
      <div 
        className="chat-content" 
        style={{
          backgroundColor: isUser ? `rgba(${Common.colors.primary100}, 0.3)` : '', 
          whiteSpace: 'pre-wrap', // 공백과 줄바꿈을 유지
          display: 'block', // 각 콘텐츠가 블록 요소로 출력되도록 설정
          wordBreak: 'break-word' // 긴 단어가 있을 경우 적절히 줄바꿈되도록 설정
        }}
      >
        {content}
      </div>
    </div>
  );
}

export const ScriptComponent = ({ scriptList }) => {
  return (
    <div className={scriptComponentStyle}>
      {scriptList.map((script, index) => (
        <div key={index} className="line">
          <ChatItemComponent 
            content={
              <>
                <div className="korean">{script.korean}</div>
                <div className="english">{script.english}</div>
                <div className="romanized">{script.romanized}</div>
              </>
            } 
            isUser={script.isUser} 
          />
        </div>
      ))}
    </div>
  );
};
