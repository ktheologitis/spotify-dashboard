import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contextProviders/AuthorizationContextProvider";
import { getTokenFromUrl } from "../../lib/helpers";

const AuthorizationCallBackPage = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const tokenFromurl = getTokenFromUrl();

  useEffect(() => {
    if (auth.token !== tokenFromurl) {
      auth.updateToken(tokenFromurl);
      navigate("/");
    }
  }, [auth, tokenFromurl, navigate]);

  return <></>;
};

export default AuthorizationCallBackPage;
