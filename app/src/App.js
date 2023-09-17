import React from "react";

import { Routes, Route } from "react-router-dom";

import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";

import Feed from "./pages/Feed";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";
import SettingsPage from "./pages/SettingsPage";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" index element={<Feed />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="settings" element={<SettingsPage />} />

        {/* Questo components serve per richiedere il login nelle pagine figlie */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="account" element={<Account />} />
          </Route>
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
