import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { Breed } from "../interfaces/pet.types";
import { getBreeds } from "../services/pet.services";

export const usePostPet = () => {};
export const usePutPet = () => {};

export const useGetBreeds = () => {
  return useQuery<Promise<Breed[]>, AxiosError, Breed[]>("breeds", () =>
    getBreeds()
  );
};
