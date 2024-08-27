import { css } from '@emotion/css';
import Common from "@style/common";

const scriptComponentStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  .script-block {
    margin: 1em 0;
  }

  .korean, .english, .romanized {
    font-weight: bold;
  }

  .current {
    color: #006400; /* 현재 가사 진한 초록색 */
  }

  .faded {
    color: rgba(0, 0, 0, 0.5); /* 흐리게 처리 */
  }
`;

export const ScriptComponent = ({ currentScript, prevScript, nextScript }) => {
  return (
    <div className={scriptComponentStyle}>
      {/* 이전 가사 (있으면 표시) */}
      {prevScript && (
        <div className="script-block faded">
          <div className="korean">{prevScript.korean}</div>
          <div className="english">{prevScript.english}</div>
          <div className="romanized">{prevScript.romanized}</div>
        </div>
      )}

      {/* 현재 가사 */}
      <div className="script-block current">
        <div className="korean">{currentScript.korean}</div>
        <div className="english">{currentScript.english}</div>
        <div className="romanized">{currentScript.romanized}</div>
      </div>

      {/* 다음 가사 (있으면 표시) */}
      {nextScript && (
        <div className="script-block faded">
          <div className="korean">{nextScript.korean}</div>
          <div className="english">{nextScript.english}</div>
          <div className="romanized">{nextScript.romanized}</div>
        </div>
      )}
    </div>
  );
};
