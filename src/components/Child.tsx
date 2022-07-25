import { useContext, useEffect } from "react";
import { AuthContext } from "../contextProviders/AuthorizationContextProvider/AuthorizationContextProvider";
import { getUserData } from "../lib/api";
import { getTokenFromUrl } from "../lib/helpers";
import { CLIENT_ID, SCOPE, REDIRECT_CALLBACK } from "../config";

import { useQuery } from "@tanstack/react-query";

const Child = () => {
  const auth = useContext(AuthContext);
  const me = useQuery(
    ["myData", auth.token],
    () => {
      return getUserData(auth.token);
    },
    {
      staleTime: Infinity,
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );

  useEffect(() => {
    const tokenFromurl = getTokenFromUrl();
    if (tokenFromurl && auth.token !== tokenFromurl) {
      auth.updateToken(tokenFromurl);
    }
  }, [auth]);

  return (
    <div className="App">
      <header className="App-header">spotify dashboard</header>
      <a
        href={`https://accounts.spotify.com/en/authorize?response_type=token&client_id=${CLIENT_ID}&scope=${encodeURIComponent(
          SCOPE
        )}&redirect_uri=${encodeURIComponent(
          REDIRECT_CALLBACK
        )}`}
      >
        Login to Spotify
      </a>
      <p></p>
      {auth.token}
      {/* {<p>{me.data?.display_name}</p>} */}
    </div>
  );
};

export default Child;
