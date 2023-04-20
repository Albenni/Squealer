import React from "react";

import { Routes, Route } from "react-router-dom";

import Feed from "./pages/Feed";
import Login from "./pages/Login";
import Account from "./pages/Account";

export default function App() {
  return (
    <>
      <Routes>
        <Route index element={<Feed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
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
