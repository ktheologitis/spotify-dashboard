import { useQuery } from "@tanstack/react-query";
import { getUserTopArtists } from "../lib/api";
import { useUser } from "./useUser";
import {
  Artist,
  Nullable,
  TopArtistsSchema,
} from "../lib/types";
import { sleep } from "../lib/helpers";

export const useTopArtists = (
  authToken: string,
  userId: string | undefined
): Nullable<Artist[]> => {
  const user = useUser(authToken);

  const { data } = useQuery(
    ["top/artists", userId],
    async () => {
      await sleep(2000);
      return getUserTopArtists(authToken);
    },
    {
      enabled: user !== undefined,
      staleTime: Infinity,
    }
  );

  const parsedData = TopArtistsSchema.safeParse(data);

  return parsedData.success ? parsedData.data.items : null;
};
