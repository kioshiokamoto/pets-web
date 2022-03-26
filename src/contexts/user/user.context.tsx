import React, { createContext, useMemo } from "react";
// import { ContextDevTool } from "react-context-devtool";

import { UserProviderProps as Props } from "./user.context.types";
import { UserProviderValue } from "./user.context.types";

// @ts-ignore
export const UserContext = createContext<UserProviderValue>();

const UserProvider: React.FC<Props> = (props) => {
  // const { data: session, status } = useSession();
  // const [user, setUser] = useState<User>();

  const value: UserProviderValue = useMemo(() => {
    return {};
  }, []);

  return (
    <UserContext.Provider value={value}>
      {/* <ContextDevTool context={ UserContext } id="user" displayName="User" /> */}
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
