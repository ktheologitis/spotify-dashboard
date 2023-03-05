import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { search } from "../lib/api";
import {
  Artist,
  ArtistSearchSchema,
  Song,
  SongSearchSchema,
} from "../lib/types";

export const useSearch = <T extends Artist[] | Song[]>(
  authToken: string,
  searchValue: string,
  type: "artist" | "track"
) => {
  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ["search", [searchValue, type]],
    queryFn: async () => {
      return search<T>(authToken, searchValue, type);
    },
    enabled: authToken !== "" && searchValue.trim() !== "",
    staleTime: Infinity,
  });

  const parsedArtistData = useMemo(
    () => ArtistSearchSchema.safeParse(data),
    [data]
  );

  const parsedSongData = useMemo(
    () => SongSearchSchema.safeParse(data),
    [data]
  );

  let searchData = null;
  if (type === "artist") {
    searchData = parsedArtistData.success
      ? parsedArtistData.data.artists.items
      : null;
  } else {
    searchData = parsedSongData.success
      ? parsedSongData.data.tracks.items
      : null;
  }

  return {
    searchResults: searchData as T | null,
    getSearchResultsSuccess: isSuccess,
    isSearchLoading: isFetching,
  };
};
