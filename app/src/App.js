import React, { useEffect, useState, useRef } from "react";

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

import useAxiosPrivate from "./hooks/useAxiosPrivate";
import config from "./config/config";

function useSessionStoragePolling(key, intervalMs = 1000) {
  const [data, setData] = useState(sessionStorage.getItem(key));

  useEffect(() => {
    const interval = setInterval(() => {
      const newValue = sessionStorage.getItem(key);
      if (newValue !== data) {
        setData(newValue);
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, [data, key, intervalMs]);

  return data;
}

export default function App() {
  // Messaggi temporizzati
  const tempGeo = useSessionStoragePolling("tempgeo");
  const tempTimer = useRef(null);
  const axiosInstance = useAxiosPrivate();

  useEffect(() => {
    let localIndex = parseInt(sessionStorage.getItem("index")) || 0; // Recupera l'indice dal sessionStorage o inizializza a 0 se non esiste
    let localSquealId = sessionStorage.getItem("squealId");

    if (sessionStorage.getItem("tempgeo") === "start") {
      if (!tempTimer.current) {
        tempTimer.current = setInterval(() => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                let postobj = {
                  index: localIndex++,
                  content:
                    position.coords.latitude + "," + position.coords.longitude,
                };
                if (localIndex !== 0) postobj.squealId = localSquealId;

                console.log(postobj);

                axiosInstance
                  .post(
                    config.endpoint.users +
                      "/" +
                      sessionStorage.getItem("userid") +
                      "/tempSqueals",
                    postobj
                  )
                  .then((response) => {
                    console.log(response.data);
                    localSquealId = response.data._id;
                    sessionStorage.setItem("squealId", localSquealId);
                  })
                  .catch((error) => {
                    console.log(error);
                  });

                sessionStorage.setItem("index", localIndex.toString());
              },
              (error) => {
                console.log(error);
              },
              { enableHighAccuracy: true }
            );
          } else {
            console.log("Geolocation is not supported by this browser.");
          }
        }, 5000);
      }
    } else if (sessionStorage.getItem("tempgeo") === "stop") {
      if (tempTimer.current) {
        clearInterval(tempTimer.current);
        tempTimer.current = null;
        sessionStorage.removeItem("index");
        sessionStorage.removeItem("squealId");
        sessionStorage.removeItem("tempgeo");
      }
    }

    return () => {
      if (tempTimer.current) {
        clearInterval(tempTimer.current);
        tempTimer.current = null;
      }
    };
  }, [tempGeo]);

  return (
    <>
      <Routes>
        <Route path="/" index element={<Login />} />

        <Route path="/newpassword" element={<ResetPasswordPage />} />
        {/* Mantiene l'autenticazione nelle pagine figlie */}
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
