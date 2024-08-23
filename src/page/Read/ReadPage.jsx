import { css } from '@emotion/css';
import { useState } from 'react';
import { FiMic, FiMicOff } from "react-icons/fi";

import Common from "@style/common"
import HeaderDummy from "@components/HeaderDummy";
import { VideoComponent } from './VideoComponent';
import { ScriptComponent } from './ScriptComponent';
import NavBarDummy from '@components/NavBarDummy';

const readPageStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100vh;

  .speak-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: .5em;
    background-color: rgba(${Common.colors.gray500}, 0.5);
    color: rgba(${Common.colors.text});
    font-size: 1.7em;
    cursor: pointer;
    transition: all .3s;
    box-shadow: 0 0 10px rgba(${Common.colors.gray500}, 0.5);
  }
`;

export const ReadPage = () => {
  const ReadScriptData = {
    "videoList": [
      {
        "videoId": 1,
        "videoContent": "안녕하세요? 오늘은 어떤 하루를 보내셨나요?",
        "videoUrl": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      },
      {
        "videoId": 2,
        "videoContent": "",
        "videoUrl": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
      },
    ],
    "scriptList": [
      {
        "scriptId": 1,
        "isUser": false,
        "scriptContent": "안녕하세요? 오늘은 어떤 하루를 보내셨나요?"
      },
      {
        "scriptId": 2,
        "isUser": true,
        "scriptContent": "오늘은 좋은 하루였어요."
      },
      {
        "scriptId": 3,
        "isUser": false,
        "scriptContent": "그렇군요. 저도 좋은 하루를 보냈어요. 식사는 잘 하셨나요?"
      },
      {
        "scriptId": 4,
        "isUser": true,
        "scriptContent": "네, 오늘은 라면을 먹었어요."
      },
    ]
  }

  const [videoIndex, setVideoIndex] = useState(0);
  const [speakOn, setSpeakOn] = useState(false);

  const handleSpeak = () => {
    if (speakOn) {
      // stop speaking
      if (videoIndex + 1 < ReadScriptData.videoList.length) {
        setVideoIndex(videoIndex + 1);
      } else {
        setVideoIndex(0);
      }
    }
    setSpeakOn(!speakOn);
  }

  return (
    <div className={readPageStyle}>
      <HeaderDummy />
      <VideoComponent videoList={ReadScriptData.videoList} index={videoIndex} />
      <ScriptComponent scriptList={ReadScriptData.scriptList} />
      <div className='speak-button' onClick={handleSpeak} style={{
        backgroundColor: speakOn ? `rgba(${Common.colors.primary300}, 0.5)` : `rgba(${Common.colors.gray500}, 0.5)`,
      }}>
        {speakOn ? <FiMic /> : <FiMicOff />}
      </div>
      <NavBarDummy />
    </div>
  );
};
