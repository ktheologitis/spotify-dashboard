import { useQuery } from "@tanstack/react-query";
import { getUserTopSongs } from "../lib/api";
import { Nullable, Song, TopSongsSchema } from "../lib/types";
import { sleep } from "../lib/helpers";

export const useTopSongs = (
  authToken: string,
  userId: string | undefined
): Nullable<Song[]> => {
  const { data } = useQuery(
    ["top/songs", userId],
    async () => {
      await sleep(2000);
      return getUserTopSongs(authToken);
    },
    {
      enabled: userId !== undefined,
      staleTime: Infinity,
    }
  );

  const parsedData = TopSongsSchema.safeParse(data);

  return parsedData.success ? parsedData.data.items : null;
};
