import { useQuery } from "@tanstack/react-query";
import { search } from "../lib/api";
import { Artist, Song } from "../lib/types";

export const useSearch = <T extends Artist[] | Song[]>(
  authToken: string,
  searchValue: string,
  type: "artist" | "track"
) => {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["search", [searchValue, type]],
    queryFn: async () => {
      return search<T>(authToken, searchValue, type);
    },
    enabled: authToken !== "" && searchValue.trim() !== "",
    staleTime: Infinity,
  });

  return { searchResults: data, isLoading, isFetching, isError };
};
