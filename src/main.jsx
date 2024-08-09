import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";
import { LoadingPage } from "./page/Loading/LodingPage.jsx";
import "./index.scss";

// ReactDom render loading page first and then render main page
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<LoadingPage />);
setTimeout(() => {root.render(<App />);}, 1800);
//ReactDOM.render(<App />, document.getElementById("root"));


