import React, { useState } from "react";
import { Filters, Nullable } from "../lib/types";

export const FiltersContext =
  React.createContext<FilterContextData>({
    data: null,
    update: (newFilters: Filters) => {},
  });

const FiltersContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [filters, setFilters] = useState<FilterContextData>({
    data: null,
    update,
  });

  function update(newFilters: Filters) {
    setFilters({ ...filters, data: newFilters });
  }

  return (
    <FiltersContext.Provider value={filters}>
      {children}
    </FiltersContext.Provider>
  );
};

export default FiltersContextProvider;

type FilterContextData = {
  data: Nullable<Filters>;
  update: (newFilters: Filters) => void;
};
