import React, { useState } from "react";
import { Filters, Nullable } from "../../lib/types";

const initialFilterData: FilterContextData = {
  data: null,
  update: (newFilters: Filters) => {},
};

export const FiltersContext = React.createContext(
  initialFilterData
);

const FiltersContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [filters, setFilters] = useState({
    data: initialFilterData.data,
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
