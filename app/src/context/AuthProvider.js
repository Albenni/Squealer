import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState();
  const [notifs, setNotifs] = useState(false);

  return (
    <AuthContext.Provider value={{ auth, setAuth, notifs, setNotifs }}>
      {console.log("AuthProvider: " + auth)}
      {/* {console.log("Notifs: " + notifs)} */}

      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
