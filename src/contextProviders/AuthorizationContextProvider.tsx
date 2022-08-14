import React, { useState } from "react";

export const AuthContext = React.createContext({
  token: "",
  updateToken: (newToken: string) => {},
});

const AuthorizationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [auth, setAuth] = useState({
    token: "",
    updateToken,
  });

  function updateToken(newToken: string) {
    setAuth({ ...auth, token: newToken });
  }

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthorizationContextProvider;
