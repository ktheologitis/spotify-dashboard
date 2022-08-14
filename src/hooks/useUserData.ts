import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AuthContext } from "../contextProviders/AuthorizationContextProvider";
import {
  getUserData,
  getUserTopArtists,
  getUserTopSongs,
} from "../lib/api";
import {
  transformToLocalArtistType,
  transformToLocalSongType,
} from "../lib/helpers";
import { Nullable, User } from "../lib/types";

export const useUserData = () => {
  const auth = useContext(AuthContext);

  const [user, setUser] = useState<Nullable<User>>(null);

  const userQuery = useQuery(
    ["user", auth.token],
    () => {
      return getUserData(auth.token);
    },
    {
      enabled: auth.token !== "",
      staleTime: Infinity,
      onSuccess: (data) => {
        setUser({
          id: data.id,
          name: data.display_name,
          email: data.email,
          country: data.country,
          profile_url: data.external_urls?.spotify,
          image_path: data.images[0]?.url,
          topSongs: null,
          topArtists: null,
        });
      },
    }
  );

  useQuery(
    ["top/songs", user],
    () => {
      return getUserTopSongs(auth.token);
    },
    {
      enabled: userQuery.status === "success",
      staleTime: Infinity,
      onSuccess: (data) => {
        if (user) {
          setUser({
            ...user,
            topSongs: transformToLocalSongType(data.items),
          });
        }
      },
    }
  );

  useQuery(
    ["top/artists", user],
    () => {
      return getUserTopArtists(auth.token);
    },
    {
      enabled: userQuery.status === "success",
      staleTime: Infinity,
      onSuccess: (data) => {
        if (user) {
          setUser({
            ...user,
            topArtists: transformToLocalArtistType(data.items),
          });
        }
      },
    }
  );

  return user;
};
