import { useContext } from "react";
import { UserContext } from "./user.context";
import { UserProviderValue } from "./user.context.types";

const useUser = () => {
  const context = useContext<UserProviderValue>(UserContext);
  if (typeof context === "undefined") {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context
};

export default useUser;
