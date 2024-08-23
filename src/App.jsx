import { BrowserRouter, Routes, Route } from "react-router-dom";
import { css } from '@emotion/css';

import Common from "@style/common"
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import { MainPage } from "./page/Main/MainPage";
import { ProfilePage } from "./page/Profile/ProfilePage";
import { StatPage } from "./page/Stat/StatPage";
import { QuizPage } from "./page/Quiz/QuizPage";
import { CallPage } from "./page/Call/CallPage";
import { ReadPage } from "./page/Read/ReadPage";
import { ChatListPage } from "./page/Chat/ChatListPage";
import { ChatPage } from "./page/Chat/ChatPage";

const rootStyle = css`
  position: relative;
  max-width: ${Common.maxWidth};
  width: 100vw;
`

export const App = () => {
  return (
    <div className={rootStyle}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path='*' element={<MainPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/stat' element={<StatPage />} />
          <Route path='/quiz' element={<QuizPage />} />
          <Route path='/call' element={<CallPage />} />
          <Route path='/read' element={<ReadPage />} />
          <Route path='/chat' element={<ChatListPage />} />
          <Route path='/chat/:chatId' element={<ChatPage />} />
        </Routes>
        <NavBar />
      </BrowserRouter>
    </div>
  );
};
