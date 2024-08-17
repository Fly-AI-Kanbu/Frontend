import { BrowserRouter, Routes, Route } from "react-router-dom";
import { css } from '@emotion/css';

import { ProfilePage } from "./page/Profile/ProfilePage";
import Header from "./components/Header";
import { MainPage } from "./page/Main/MainPage";
import Common from "@style/common"
import NavBar from "./components/NavBar";

const rootStyle = css`
  position: relative;
  max-width: ${Common.maxWidth};
`

export const App = () => {
  return (
    <div className={rootStyle}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path='/profile' element={<ProfilePage />} />
        </Routes>
        <NavBar />
      </BrowserRouter>
    </div>
  );
};
