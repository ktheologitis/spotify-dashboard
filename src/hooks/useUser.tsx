import { useQuery } from "@tanstack/react-query";
import { getUserData } from "../lib/api";
import { User, UserSchema, Nullable } from "../lib/types";
import { sleep } from "../lib/helpers";

export const useUser = (authToken: string): Nullable<User> => {
  const { data } = useQuery(
    ["user", authToken],
    async () => {
      await sleep(2000);
      return getUserData(authToken);
    },
    {
      enabled: authToken !== "",
      staleTime: Infinity,
    }
  );

  const parsedData = UserSchema.safeParse(data);

  return parsedData.success ? parsedData.data : null;
};
