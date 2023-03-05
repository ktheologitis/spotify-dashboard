import { useQuery } from "@tanstack/react-query";
import { getUserTopArtists } from "../lib/api";
import {
  Artist,
  Nullable,
  TopArtistsSchema,
} from "../lib/types";
import { useMemo } from "react";

export const useTopArtists = ({
  authToken,
  userId,
  limit = 10,
  offset = 0,
}: {
  authToken: string;
  userId: string | undefined;
  limit?: number;
  offset?: number;
}): {
  topArtists: Nullable<Artist[]>;
  topArtistsCount: Nullable<number>;
  getTopArtistsSuccess: boolean;
  topArtisIsLoading: boolean;
} => {
  const { data, isSuccess, isLoading } = useQuery(
    ["top/artists", [userId, offset, limit]],
    async () => {
      return getUserTopArtists(authToken, offset, limit);
    },
    {
      enabled: userId !== undefined,
      staleTime: Infinity,
    }
  );

  const parsedData = useMemo(
    () => TopArtistsSchema.safeParse(data),
    [data]
  );

  return {
    topArtists: parsedData.success
      ? parsedData.data.items
      : null,
    topArtistsCount: parsedData.success
      ? parsedData.data.total
      : null,
    getTopArtistsSuccess: isSuccess,
    topArtisIsLoading: isLoading,
  };
};
