import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./ContextProvider";
import { getMyData } from "../lib/api";
import { getTokenFromUrl } from "../lib/helpers";
import { CLIENT_ID, SCOPE, REDIRECT_CALLBACK } from "../config";

import { useQuery } from "@tanstack/react-query";

const Child = () => {
  const auth = useContext(AuthContext);
  const me = useQuery(
    ["myData", auth.token],
    () => {
      return getMyData(auth.token);
    },
    { staleTime: Infinity }
  );

  useEffect(() => {
    const tokenFromurl = getTokenFromUrl();
    if (tokenFromurl && auth.token !== tokenFromurl) {
      auth.updateToken(tokenFromurl);
    }
  }, [auth]);

  useEffect(() => {
    console.log(me);
  }, [me]);

  return (
    <div className="App">
      <header className="App-header">spotify dashboard</header>
      <a
        href={`https://accounts.spotify.com/en/authorize?response_type=token&client_id=${CLIENT_ID}&scope=${encodeURIComponent(
          SCOPE
        )}&redirect_uri=${encodeURIComponent(REDIRECT_CALLBACK)}`}
      >
        Login to Spotify
      </a>
      <p></p>
      {auth.token}
      {me.isFetched && <p>{me.data?.data.display_name}</p>}
    </div>
  );
};

export default Child;
