import React from "react";
import ReactDOM from "react-dom";
import "./styles/globalStyles.css";
// import "react-nice-dates/build/style.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);
