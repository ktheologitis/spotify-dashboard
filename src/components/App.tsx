import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contextProviders/AuthorizationContextProvider";
import Routing from "../Routing";
import "../stylesheets/global.scss";

function App() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (auth.token) navigate("./recommendations");
    else navigate("./authorize");
  }, [auth.token]);

  return <Routing />;
}

export default App;
