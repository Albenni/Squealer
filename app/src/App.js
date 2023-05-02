import React, { useState } from "react";

import { Routes, Route } from "react-router-dom";

import useAuth from "./hooks/useAuth";
import RequireAuth from "./components/RequireAuth";

import Feed from "./pages/Feed";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";

export default function App() {
  const { auth } = useAuth();

  return (
    <>
      <p>token: {auth}</p>
      <Routes>
        <Route index element={<Feed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Questo components serve per richiedere il login nelle pagine figlie */}
        <Route element={<RequireAuth />}>
          <Route path="/account" element={<Account />} />
        </Route>

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
