import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";
import { User } from "../interfaces/user.types";
import { getUserData } from "../services/user.services";

export const useGetUser = () => {
  const { data: session } = useSession();

  return useQuery<Promise<User>, AxiosError, User>(
    ["userData", session],
    () => getUserData(session.user?.email),
    {
      enabled: !!session,
    }
  );
};

export const usePutUserData = () => {};

