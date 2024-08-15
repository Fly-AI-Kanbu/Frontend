import { BrowserRouter, Routes, Route } from "react-router-dom";

import { LoadingPage } from "./page/Loading/LodingPage";
import Header from "./components/Header";
import { MainPage } from "./page/Main/MainPage";

export const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
