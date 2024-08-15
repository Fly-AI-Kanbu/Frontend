import { BrowserRouter, Routes, Route } from "react-router-dom";
import { css } from '@emotion/css';

import { LoadingPage } from "./page/Loading/LodingPage";
import Header from "./components/Header";
import { MainPage } from "./page/Main/MainPage";
import Common from "@style/common"

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
        </Routes>
      </BrowserRouter>
    </div>
  );
};
