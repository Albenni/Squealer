import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState();
  const [otp, setOtp] = useState();

  return (
    <AuthContext.Provider value={{ auth, setAuth, otp, setOtp }}>
      {console.log("AuthProvider: " + auth)}
      {console.log("OTPProvider: " + otp)}
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
