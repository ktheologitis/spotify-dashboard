import { useQuery } from "@tanstack/react-query";
import { search } from "../lib/api";
import { sleep } from "../lib/helpers";
import { Artist, Song } from "../lib/types";

export const useSearch = <T extends Artist[] | Song[]>(
  authToken: string,
  q: string,
  type: "artist" | "track"
) => {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["search", [q, type]],
    queryFn: async () => {
      await sleep(2000);
      return search<T>(authToken, q, type);
    },
    enabled: authToken !== "" && q.trim() !== "",
    staleTime: Infinity,
  });

  return { searchResults: data, isLoading, isFetching, isError };
};
