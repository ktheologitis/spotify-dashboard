import React, { useState } from "react";

const initialToken = "";
export const AuthContext = React.createContext({
  token: initialToken,
  updateToken: (newToken: string) => {},
});

const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [auth, setAuth] = useState({
    token: initialToken,
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

export default ContextProvider;
