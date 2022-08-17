import { useQuery } from "@tanstack/react-query";
import {
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthContext } from "../contextProviders/AuthorizationContextProvider";
import { search } from "../lib/api";
import { FilterTypes } from "../lib/enums";
import {
  transformToLocalArtistType,
  transformToLocalSongType,
} from "../lib/helpers";
import { Artist, Nullable, Song } from "../lib/types";

export const useSelectionFilterLogic = <
  T extends Artist | Song | string
>(
  type: FilterTypes,
  topEntities: Nullable<T[]>,
  selectedEntities: Nullable<string[]>,
  updateFilter: (
    filterType: FilterTypes,
    newFilters: string[]
  ) => void
) => {
  const auth = useContext(AuthContext);
  const [displayed, setDisplayed] = useState<Nullable<T[]>>(
    topEntities?.slice(0, 10) ?? null
  );
  const [selected, setSelected] = useState(selectedEntities);
  const [searchValue, setSearchValue] = useState("");
  const [canSearch, setCanSearch] = useState(false);

  const searchType =
    type === FilterTypes.Artists ? "artist" : "track";

  const queryId =
    type === FilterTypes.Artists
      ? "searchArtist"
      : "searchTrack";

  useQuery(
    [queryId],
    () => {
      return search(auth.token, searchType, searchValue);
    },
    {
      enabled: canSearch,
      onSuccess(data) {
        setCanSearch(false);
        setDisplayed((displayed) => {
          switch (type) {
            case FilterTypes.Artists:
              return transformToLocalArtistType(
                data.artists.items
              ) as T[];
            case FilterTypes.Songs:
              return transformToLocalSongType(
                data.tracks.items
              ) as T[];
            default:
              return displayed;
          }
        });
      },
    }
  );

  const handleClick = useCallback((id: string) => {
    setSelected((selected) => {
      if (!selected) {
        return [id];
      }
      let updated;
      if (selected.includes(id)) {
        updated = selected.filter((item: string) => item !== id);
      } else {
        updated = [...selected, id];
      }
      return updated;
    });
  }, []);

  const handleShuffle = useCallback(() => {
    setDisplayed((_) => {
      const number = Math.floor(Math.random() * 40);
      return topEntities?.slice(number, number + 10) ?? null;
    });
  }, [topEntities]);

  const handleChangeSearchInput = useCallback(
    (value: string) => {
      setSearchValue(value);
    },
    []
  );

  useEffect(() => {
    if (selected) updateFilter(type, selected);
  }, [selected, type, updateFilter]);

  useEffect(() => {
    setDisplayed(topEntities?.slice(0, 10) ?? null);
  }, [topEntities]);

  return {
    displayed,
    searchValue,
    setCanSearch,
    handleClick,
    handleShuffle,
    handleChangeSearchInput,
  };
};
