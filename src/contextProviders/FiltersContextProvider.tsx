import React, { useState } from "react";
import { Filters, Nullable } from "../lib/types";

export const FiltersContext =
  React.createContext<FilterContextData>({
    filters: null,
    update: (newFilters: Filters) => {},
  });

const FiltersContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [filters, setFilters] = useState<FilterContextData>({
    filters: null,
    update,
  });

  function update(newFilters: Filters) {
    setFilters({ ...filters, filters: newFilters });
  }

  return (
    <FiltersContext.Provider value={filters}>
      {children}
    </FiltersContext.Provider>
  );
};

export default FiltersContextProvider;

type FilterContextData = {
  filters: Nullable<Filters>;
  update: (newFilters: Filters) => void;
};
