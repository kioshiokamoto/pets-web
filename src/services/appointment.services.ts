import axios from "axios";

import { AppointmentConfig } from "../interfaces/appointment.types";
import { Appointment } from "../interfaces/appointment.types";

export const createAppointment = async (config: AppointmentConfig) => {
  const result = await axios.post("/api/appointment/create", { config });

  return result.data as Appointment;
};

export const getAppointmentByPet = async (petId: number) => {
  const result = await axios.get(`/api/appointment/getByPet?petId=${petId}`);

  return result.data as Appointment[];
};
