import { useQuery } from "@tanstack/react-query";
import { getRecommendations } from "../lib/api";
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
}): {
  recommendations: Nullable<Song[]>;
  isLoading: boolean;
} => {
  const { data, isFetching } = useQuery(
    ["recommendations", [filters, limit]],
    async () => {
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

  return {
    recommendations: parsedData.success
      ? parsedData.data.tracks
      : null,
    isLoading: isFetching,
  };
};
