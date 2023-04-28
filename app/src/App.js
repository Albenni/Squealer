import React, { useState } from "react";

import { Routes, Route } from "react-router-dom";

import Feed from "./pages/Feed";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";

export default function App() {
  const [token, setToken] = useState("a");

  return (
    <>
      <Routes>
        <Route index element={<Feed />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
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
