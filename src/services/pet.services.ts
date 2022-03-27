import axios from "axios";
import { Breed } from "../interfaces/pet.types";

export const getBreeds = async () => {
  const result = await axios.get("api/pet/getBreeds");
  return result.data as Breed[];
};
