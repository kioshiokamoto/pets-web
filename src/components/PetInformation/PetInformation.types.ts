// Interfaces and types from component PetInformation
import { Appointment } from "../../interfaces/appointment.types";
import { PetProps } from "../Pet/Pet.types";

// Component Props
export interface PetInformationProps {
  pet: PetProps;
  userHasValidSession: boolean;
  petBelongsToUser: boolean;
  deletePost: (id: number) => void;
  createAppointment: (description: string, symptoms: string) => void;
  appointments: Appointment[];
}

// Styled Component Props
export interface PetInformationStyledProps {
  className: string;
}
