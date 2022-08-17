import { useContext, useEffect } from "react";
import { getTokenFromUrl } from "../../lib/helpers";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contextProviders/AuthorizationContextProvider";

const AuthorizationCallBackPage = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const tokenFromurl = getTokenFromUrl();

  useEffect(() => {
    if (auth.token !== tokenFromurl) {
      auth.updateToken(tokenFromurl);
    }
  }, [auth, tokenFromurl, navigate]);

  return <></>;
};

export default AuthorizationCallBackPage;
