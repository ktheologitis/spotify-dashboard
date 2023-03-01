import { useState } from "react";
import { Filters } from "../lib/types";

type FilterKeys = keyof Filters;

export const useFilter = <T extends Filters[FilterKeys]>(
  initialValue: T | null = null
): FilterState<T | null> => {
  const [filter, setFilter] = useState(initialValue);

  return { filter, set: setFilter };
};

export type FilterState<T> = {
  filter: T;
  set: React.Dispatch<React.SetStateAction<T>>;
};
