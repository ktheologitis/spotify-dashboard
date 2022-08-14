import React from "react";
import { useUserData } from "../hooks/useUserData";
import { Nullable, User } from "../lib/types";

export const UserDataContext =
  React.createContext<Nullable<User>>(null);

const UserDataContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const user = useUserData();

  return (
    <UserDataContext.Provider value={user}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataContextProvider;
