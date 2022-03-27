// Interfaces and types from component CreatePet
import { CreatePet } from "../../interfaces/pet.types";

// Component Props
export interface CreatePetProps {
  submitData: (e: React.SyntheticEvent, pet: CreatePet) => void;
}

// Styled Component Props
export interface CreatePetStyledProps {
  className: string;
}
