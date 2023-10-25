import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAuth from "../../hooks/useAuth";
import loading from "../../assets/Loading.gif";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  //   const { auth, persist } = useAuth();
  const { auth } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
      console.log("auth in verifyRefreshToken: " + JSON.stringify(auth));
    };

    console.log("auth in persistlogin: " + JSON.stringify(auth));

    // persist Avoids unwanted call to verifyRefreshToken
    // !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);
    !auth ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, []);

  //   useEffect(() => {
  //     console.log(`isLoading: ${isLoading}`);
  //     console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
  //   }, [isLoading]);

  return (
    // <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>
    <>
      {isLoading ? (
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
            alt="Loading..."
          />
          <h1>Loading...</h1>
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
