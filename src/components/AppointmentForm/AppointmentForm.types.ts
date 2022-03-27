// Interfaces and types from component AppointmentForm

// Component Props
export interface AppointmentFormProps {
  setVisibleBooking: React.Dispatch<React.SetStateAction<boolean>>;
  createAppointment?: (description: string, symptoms: string) => void;
}

// Styled Component Props
export interface AppointmentFormStyledProps {
  className: string;
}
