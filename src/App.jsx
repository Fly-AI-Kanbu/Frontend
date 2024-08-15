import { BrowserRouter, Routes, Route } from "react-router-dom";

import { MainPage } from "./page/Main/MainPage";

export const App = () => {
  return (
    <div>
      <BrowserRouter>
        {/*<Header />*/}
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
