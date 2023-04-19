import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Feed from "./pages/Feed";
import SquealBox from "./components/SquealBox";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Feed />
    {/* <SquealBox /> */}
  </React.StrictMode>
);
