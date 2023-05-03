import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

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
    };

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
    <>{isLoading ? <p>Loading...</p> : <Outlet />}</>
  );
};

export default PersistLogin;
