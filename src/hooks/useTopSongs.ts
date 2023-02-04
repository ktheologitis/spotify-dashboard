import { useQuery } from "@tanstack/react-query";
import { getUserTopSongs } from "../lib/api";
import { Nullable, Song, TopSongsSchema } from "../lib/types";
import { sleep } from "../lib/helpers";
import { useMemo } from "react";

export const useTopSongs = ({
  authToken,
  userId,
  limit = 15,
  offset = 0,
}: {
  authToken: string;
  userId: string | undefined;
  limit?: number;
  offset?: number;
}): {
  topSongs: Nullable<Song[]>;
  topSongsCount: Nullable<number>;
  getTopSongsSuccess: boolean;
} => {
  const { data, isFetching, isSuccess, isError } = useQuery(
    ["top/songs", [userId, offset, limit]],
    async () => {
      // await sleep(2000);
      return getUserTopSongs(authToken, offset, limit);
    },
    {
      enabled: userId !== undefined,
      staleTime: Infinity,
    }
  );

  const parsedData = useMemo(
    () => TopSongsSchema.safeParse(data),
    [data]
  );

  return {
    topSongs: parsedData.success ? parsedData.data.items : null,
    topSongsCount: parsedData.success
      ? parsedData.data.total
      : null,
    getTopSongsSuccess: isSuccess,
  };
};
