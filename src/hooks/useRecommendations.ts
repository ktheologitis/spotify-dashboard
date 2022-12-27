import { useQuery } from "@tanstack/react-query";
import { getRecommendations } from "../lib/api";
import { sleep } from "../lib/helpers";
import {
  Filters,
  Nullable,
  RecommendationsSchema,
  Song,
} from "../lib/types";

export const useRecomendations = (
  authToken: string,
  filters: Nullable<Filters>
): Nullable<Song[]> => {
  const { data } = useQuery(
    ["recommendations", filters],
    async () => {
      await sleep(2000);
      return getRecommendations(authToken, filters as Filters);
    },
    {
      enabled: filters != null,
      staleTime: Infinity,
    }
  );

  const parsedData = RecommendationsSchema.safeParse(data);

  return parsedData.success ? parsedData.data.tracks : null;
};
