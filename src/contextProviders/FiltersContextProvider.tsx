import React, { useState } from "react";
import { FilterTypes } from "../lib/enums";
import { AudioFeatureData, Filters } from "../lib/types";

const initialFilters: Filters = {
  artists: null,
  songs: null,
  genres: null,
  acousticness: { enabled: false, value: null },
  valence: { enabled: false, value: null },
  danceability: { enabled: false, value: null },
  loudness: { enabled: false, value: null },
};

export const FiltersContext =
  React.createContext<FilterContextData>({
    data: initialFilters,
    update: (
      filterType: FilterTypes,
      data: string[] | AudioFeatureData
    ) => {},
  });

const FiltersContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [filters, setFilters] = useState<FilterContextData>({
    data: initialFilters,
    update,
  });

  function update(
    filterType: FilterTypes,
    data: string[] | AudioFeatureData
  ) {
    setFilters((filters) => {
      return {
        ...filters,
        data: { ...filters.data, [filterType]: data },
      };
    });
  }

  return (
    <FiltersContext.Provider value={filters}>
      {children}
    </FiltersContext.Provider>
  );
};

export default FiltersContextProvider;

export type FilterContextData = {
  data: Filters;
  update: (
    filterType: FilterTypes,
    data: string[] | AudioFeatureData
  ) => void;
};
