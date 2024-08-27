import React from "react";
import { css } from '@emotion/css';
import { FaMicrophone, FaStop } from "react-icons/fa"; // 녹음 중지 아이콘 추가

const recordButtonStyle = css`
  background-color: black; /* 배경을 검정색으로 설정 */
  border: none;
  border-radius: 50%;
  padding: 15px;
  color: white;
  font-size: 2em;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin-top: 20px;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #333; /* hover 시 좀 더 밝은 검정색 */
    transform: scale(1.1);
  }

  &:active {
    background-color: #111; /* 클릭 시 더 어두운 검정색 */
    transform: scale(0.9);
  }
`;

export const RecordButton = ({ isRecording, toggleRecording }) => {
  return (
    <button
      className={recordButtonStyle}
      onClick={toggleRecording}
    >
      {isRecording ? <FaStop /> : <FaMicrophone />} {/* 녹음 중일 때는 중지 아이콘 표시 */}
    </button>
  );
};
