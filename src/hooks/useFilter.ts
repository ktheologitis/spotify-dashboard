import { useState } from "react";

export const useFilter = <T>(
  initialValue: T | null = null
): FilterState<T | null> => {
  const [data, setData] = useState(initialValue);

  return { data, set: setData };
};

export type FilterState<T> = {
  data: T;
  set: React.Dispatch<React.SetStateAction<T>>;
};
