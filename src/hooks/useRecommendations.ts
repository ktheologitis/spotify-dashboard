import { useQuery } from "@tanstack/react-query";
import { getRecommendations } from "../lib/api";
import { sleep } from "../lib/helpers";
import {
  Filters,
  Nullable,
  RecommendationsSchema,
  Song,
} from "../lib/types";

export const useRecomendations = ({
  authToken,
  filters,
  limit = 30,
}: {
  authToken: string;
  filters: Nullable<Filters>;
  limit?: number;
}): Nullable<Song[]> => {
  const { data, isFetching, isSuccess, isError } = useQuery(
    ["recommendations", [filters, limit]],
    async () => {
      // await sleep(2000);
      return getRecommendations(
        authToken,
        filters as Filters,
        limit
      );
    },
    {
      enabled: filters != null,
      staleTime: Infinity,
    }
  );

  const parsedData = RecommendationsSchema.safeParse(data);

  return parsedData.success ? parsedData.data.tracks : null;
};
