import { useQuery } from "@tanstack/react-query";
import { getUserTopArtists } from "../lib/api";
import {
  Artist,
  Nullable,
  TopArtistsSchema,
} from "../lib/types";
import { sleep } from "../lib/helpers";
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
} => {
  const { data, isSuccess } = useQuery(
    ["top/artists", [userId, offset, limit]],
    async () => {
      // await sleep(2000);
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
  };
};
