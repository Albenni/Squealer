import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Feed from "./pages/Feed"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Feed />
  </React.StrictMode>
);
