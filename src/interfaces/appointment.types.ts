import { Pet } from "./pet.types";

export interface Appointment {
  id: number;
  description: string;
  symptoms: string;
  image: string;
  bloodTest: string;
  medicine: string;
  status: AppointmentStatus;
  pet: Pet;
}

export interface AppointmentConfig
  extends Pick<Appointment, "description" | "symptoms"> {
  petId: number;
}
const AppointmentStatus = {
  BOOKED: "BOOKED",
  ATTENDED: "ATTENDED",
  CANCELLED: "CANCELLED",
} as const;

export type AppointmentStatus =
  typeof AppointmentStatus[keyof typeof AppointmentStatus];

export interface AppointmentUpdateConfig
  extends Omit<Appointment, "description" | "symptoms" | "pet"> {}
