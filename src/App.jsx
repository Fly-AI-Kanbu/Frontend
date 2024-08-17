import { BrowserRouter, Routes, Route } from "react-router-dom";
import { css } from '@emotion/css';

import Common from "@style/common"
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import { MainPage } from "./page/Main/MainPage";
import { ProfilePage } from "./page/Profile/ProfilePage";
import { StatPage } from "./page/Stat/StatPage";

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
          <Route path='/stat' element={<StatPage />} />
        </Routes>
        <NavBar />
      </BrowserRouter>
    </div>
  );
};
