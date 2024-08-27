import { useEffect, useState } from 'react';
import axios from 'axios';
import { css } from '@emotion/css';
import Common from "@style/common";
import { RecordButton } from './RecordButton';

const callModelComponentStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex-grow: 1;
  justify-content: center;

  img {
    width: 55%;
    border-radius: 45%;
    animation: audioWave 1s infinite;
  }

  .time-count {
    font-size: 2em;
    font-weight: 700;
    margin-top: 1rem;
    color: rgba(${Common.colors.text});
  }
  .description {
    font-size: 1em;
    font-weight: 600;
    color: rgba(${Common.colors.text}, 0.7);
  }

  @keyframes audioWave {
    0% {
      box-shadow: 0 0 20px rgba(${Common.colors.primary400});
    }
    50% {
      box-shadow: 0 0 40px rgba(${Common.colors.primary800}), 0 0 20px rgba(${Common.colors.primary600});
    }
    100% {
      box-shadow: 0 0 20px rgba(${Common.colors.primary400});
    }
  }
`;

export const CallModelComponent = () => {
  const [timeCount, setTimeCount] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [statusMessage, setStatusMessage] = useState("AI 모델과 대화해보세요");
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);  
  const [audioKey, setAudioKey] = useState(0);  // Audio 키를 관리하는 상태
  const [isInteractionInProgress, setIsInteractionInProgress] = useState(false); // 전체 상호작용 상태 (녹음부터 응답 끝까지)

  useEffect(() => {
    let timer;

    if (isTimerRunning) {
      timer = setInterval(() => {
        setTimeCount((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(timer); 
  }, [isTimerRunning]);

  const toggleRecording = () => {
    if (!isRecording && !isInteractionInProgress) {  // 상호작용 중일 때는 녹음 불가
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
        const audioChunks = [];

        recorder.start();
        setIsRecording(true);
        setIsInteractionInProgress(true);  // 상호작용 시작
        setStatusMessage("GPT가 듣는 중입니다...");

        if (!isTimerRunning) {
          setIsTimerRunning(true);
        }

        recorder.addEventListener("dataavailable", (event) => {
          audioChunks.push(event.data);
        });

        recorder.addEventListener("stop", () => {
          const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
          setAudioBlob(audioBlob);
          handleSTT(audioBlob);  // STT 처리
        });
      });
    } else if (isRecording) {
      if (mediaRecorder) {
        mediaRecorder.stop();
        setIsRecording(false);
      }
    }
  };

  const handleSTT = (audioBlob) => {
    setStatusMessage("GPT가 대답을 생각하는 중입니다...");

    const formData = new FormData();
    formData.append("file", audioBlob, "audio.wav");

    axios.post("http://localhost:8000/call/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      responseType: 'arraybuffer',
    })
    .then((response) => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }

      const newAudioBlob = new Blob([response.data], { type: 'audio/mpeg' });
      const newAudioUrl = URL.createObjectURL(newAudioBlob);
      setAudioUrl(newAudioUrl);  // 새로운 오디오 URL로 교체
      setAudioKey(prev => prev + 1);  // 오디오 키 업데이트
      setStatusMessage("GPT가 말하는 중입니다...");
    })
    .catch((error) => {
      console.error("STT 실패:", error);
      setStatusMessage("STT 요청 중 오류 발생");
      setIsInteractionInProgress(false);  // 상호작용 종료 (실패 시)
    });
  };

  const handleAudioEnded = () => {
    setIsInteractionInProgress(false);  // 오디오 재생 완료 후 상호작용 종료
    setStatusMessage("GPT에게 대답해주세요.");
  };

  return (
    <div className={callModelComponentStyle}>
      {/*<img src="https://cdn.prod.website-files.com/657639ebfb91510f45654149/6642741e323daf4ab36b0877_Frame%2048095503.png" alt="" />*/}
      <img src = "/friend.webp" alt="" />

      <div className='time-count'>
        {String(Math.floor(timeCount / 60)).padStart(2, '0')}:{String(timeCount % 60).padStart(2, '0')}
      </div>
      <div className='description'>{statusMessage}</div>

      {/* 녹음 버튼은 상호작용 중일 때 비활성화됨 */}
      <RecordButton isRecording={isRecording} toggleRecording={toggleRecording} disabled={isInteractionInProgress} />

      {audioUrl && (
        <audio
          key={audioKey}
          src={audioUrl}
          onEnded={handleAudioEnded}
          autoPlay
          style={{ display: 'none' }} // 오디오 플레이어를 비가시화
        />
      )}
    </div>
  );
};
