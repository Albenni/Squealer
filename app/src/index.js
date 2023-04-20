import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import Login from "./pages/Login";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <App /> */}
      <Login />
      
    </BrowserRouter>
  </React.StrictMode>
);
