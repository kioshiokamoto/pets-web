// Interfaces and types from component AppointmentDetail
import { Appointment } from "../../interfaces/appointment.types";

// Component Props
export interface AppointmentDetailProps extends Appointment {
  userHasValidSession: boolean;
  petBelongsToUser: boolean;
}

// Styled Component Props
export interface AppointmentDetailStyledProps {
  className: string;
}
