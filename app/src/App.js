import React from "react";

import { Routes, Route, useParams } from "react-router-dom";

import RequireAuth from "./components/auth/RequireAuth";
import PersistLogin from "./components/auth/PersistLogin";

import Feed from "./pages/Feed";
import Login from "./pages/Login";
import SettingsPage from "./pages/SettingsPage";
import AccountPage from "./pages/AccountPage";
import ChannelsPage from "./pages/ChannelsPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import loading from "./assets/Loading.gif";
import KeywordsPage from "./pages/KeywordsPage";
import ChannelPage from "./pages/ChannelPage";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" index element={<Login />} />

        <Route path="/newpassword" element={<ResetPasswordPage />} />

        <Route element={<PersistLogin />}>
          <Route path="feed" element={<Feed />} />
          {/* Questo componente serve per richiedere il login nelle pagine figlie */}
          <Route element={<RequireAuth />}>
            {sessionStorage.getItem("userid") !== "guest" && (
              <>
                <Route path="/:username" element={<Account />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="channels" element={<ChannelsPage />} />
                <Route path="channel/:channelname" element={<Channel />} />
                <Route path="keywords" element={<KeywordsPage />} />
              </>
            )}
          </Route>
        </Route>

        <Route
          path="*"
          element={
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                height: "100vh",
                width: "100vw",
                backgroundColor: "#f1f1f1",
                position: "fixed",
                top: "0",
                left: "0",
                zIndex: "1000",
              }}
            >
              <img
                src={loading}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                }}
                alt="Page not found"
              />
              <h1>Page not found</h1>
            </div>
          }
        />
      </Routes>
    </>
  );
}

function Account() {
  let { username } = useParams();

  return <AccountPage username={username} />;
}

function Channel() {
  let { channelname } = useParams();

  return <ChannelPage channelname={channelname} />;
}
