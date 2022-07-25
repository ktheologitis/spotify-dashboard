import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contextProviders/AuthorizationContextProvider/AuthorizationContextProvider";
import { FiltersContext } from "../contextProviders/FiltersContextProvider/FiltersContextProvider";
import { getRecommendations } from "../lib/api";
import { transformToLocalSongType } from "../lib/helpers";
import { Nullable, Song } from "../lib/types";

export const useRecomendations = () => {
  const [data, setData] = useState<Nullable<Song[]>>(null);
  const auth = useContext(AuthContext);
  const filters = useContext(FiltersContext);

  const recommendations = useQuery(
    ["recommendations", filters.data],
    () => {
      if (filters.data) {
        return getRecommendations(auth.token, filters.data);
      }
    },
    {
      staleTime: Infinity,
    }
  );

  useEffect(() => {
    if (recommendations.data?.tracks) {
      setData(
        transformToLocalSongType(recommendations.data.tracks)
      );
    }
  }, [recommendations.data]);

  return data;
};
