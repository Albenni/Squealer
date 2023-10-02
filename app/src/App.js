import React from "react";

import { Routes, Route } from "react-router-dom";

import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";

import Feed from "./pages/Feed";
import Login from "./pages/Login";
import SettingsPage from "./pages/SettingsPage";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" index element={<Login />} />

        {/* Questo components serve per richiedere il login nelle pagine figlie */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="feed" element={<Feed />} />
            {sessionStorage.getItem("userid") !== "guest" && (
              <Route path="settings" element={<SettingsPage />} />
            )}
          </Route>
        </Route>

        <Route
          path="*"
          element={
            <h1
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
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
