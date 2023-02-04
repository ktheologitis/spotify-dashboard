import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getGenres } from "../lib/api";
import { sleep } from "../lib/helpers";
import { GenresSchema, Nullable } from "../lib/types";

export const useGenres = (
  authToken: string
): Nullable<string[]> => {
  const { data } = useQuery(
    ["genres"],
    async () => {
      // await sleep(2000);
      return getGenres(authToken);
    },
    {
      enabled: authToken !== "",
      staleTime: Infinity,
    }
  );

  const parsedData = useMemo(
    () => GenresSchema.safeParse(data),
    [data]
  );

  return parsedData.success ? parsedData.data.genres : null;
};
