import React from "react";

import { Routes, Route } from "react-router-dom";

import Feed from "./pages/Feed";
import LoginForm from "./pages/LoginForm";
import Accout from "./pages/Accout";

export default function App() {
  return (
    <>
      <Routes>
        <Route index element={<Feed />} />
        <Route path="login" element={<LoginForm />} />
        <Route path="account" element={<Accout />} />
        <Route
          path="*"
          element={
            <h1
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              404 not found
            </h1>
          }
        />
      </Routes>
    </>
  );
}
