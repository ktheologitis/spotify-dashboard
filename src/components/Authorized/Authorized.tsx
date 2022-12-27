import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contextProviders/AuthorizationContextProvider";

const Authorized = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (!auth.token) {
      navigate("/authorize");
    }
  }, [auth.token, navigate]);

  return <>{auth.token && children}</>;
};

export default Authorized;
