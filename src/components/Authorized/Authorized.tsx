import React, { useContext } from "react";
import { AuthContext } from "../../contextProviders/AuthorizationContextProvider/AuthorizationContextProvider";
import UnauthorizedDialog from "../UnauthorizedDialog/UnauthorizedDialog";

const Authorized = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const auth = useContext(AuthContext);

  return <>{auth.token ? children : <UnauthorizedDialog />}</>;
};

export default Authorized;
