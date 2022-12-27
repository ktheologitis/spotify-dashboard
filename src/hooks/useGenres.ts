import { useQuery } from "@tanstack/react-query";
import { getGenres } from "../lib/api";
import { sleep } from "../lib/helpers";
import { GenresSchema, Nullable } from "../lib/types";

export const useGenres = (
  authToken: string
): Nullable<string[]> => {
  const { data } = useQuery(
    ["genres"],
    async () => {
      await sleep(2000);
      return getGenres(authToken);
    },
    {
      enabled: authToken !== "",
      staleTime: Infinity,
    }
  );

  const parsedData = GenresSchema.safeParse(data);

  return parsedData.success ? parsedData.data.genres : null;
};
