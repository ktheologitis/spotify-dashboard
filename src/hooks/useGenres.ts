import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../contextProviders/AuthorizationContextProvider";
import { getGenres } from "../lib/api";

export const useGenres = () => {
  const auth = useContext(AuthContext);
  const genreData = useQuery(
    ["genres"],
    () => {
      return getGenres(auth.token);
    },
    {
      staleTime: Infinity,
    }
  );

  return genreData;
};
