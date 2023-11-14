import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import "./index.css";

import App from "./App";
import { AuthProvider } from "./context/AuthProvider";

// import { Profiler } from "react";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>
  <BrowserRouter>
    {/* <Profiler
      id="App"
      onRender={(id, phase, actualDuration) => {
        console.log({ id, phase, actualDuration });
      }}
    > */}
    <AuthProvider>
      <App />
    </AuthProvider>
    {/* </Profiler> */}
  </BrowserRouter>
  // </React.StrictMode>
);
