import { css } from '@emotion/css';

import Common from "@style/common"

const scriptComponentStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  flex-grow: 1;
  width: 100%;
  padding: 1em 0;
  gap: .5em;
  overflow: scroll;
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
    <div className={chatListItemComponentStyle} style={{flexDirection: isUser ? 'row-reverse' : ''}}>
      <div className="chat-content" style={{backgroundColor: isUser ? `rgba(${Common.colors.primary100}, 0.3)` : ''}}>{content}</div>
    </div>
  );
}

export const ScriptComponent = ({ scriptList }) => {
  return (
    <div className={scriptComponentStyle}>
      {scriptList.map((script, index) => (
        <ChatItemComponent key={index} content={script.scriptContent} isUser={script.isUser} />
      ))}
    </div>
  );
};
