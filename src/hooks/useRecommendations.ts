import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AuthContext } from "../contextProviders/AuthorizationContextProvider";
import { FiltersContext } from "../contextProviders/FiltersContextProvider";
import { getRecommendations } from "../lib/api";
import { transformToLocalSongType } from "../lib/helpers";
import { Nullable, Song } from "../lib/types";

export const useRecomendations = () => {
  const [data, setData] = useState<Nullable<Song[]>>(null);
  const auth = useContext(AuthContext);
  const filters = useContext(FiltersContext);

  useQuery(
    ["recommendations", filters.data],
    () => {
      if (filters.data) {
        return getRecommendations(auth.token, filters.data);
      }
    },
    {
      staleTime: Infinity,
      onSuccess(data) {
        if (data.tracks) {
          setData(transformToLocalSongType(data.tracks));
        }
      },
    }
  );

  return data;
};
