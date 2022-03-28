import axios from "axios";

import { AppointmentUpdateConfig } from "../interfaces/appointment.types";
import { AppointmentStatus } from "../interfaces/appointment.types";
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

export const getAppointmentsByCategory = async (
  category: AppointmentStatus
) => {
  const result = await axios.get(
    `/api/appointment/getByCategory?category=${category}`
  );

  return result.data as Appointment[];
};

export const putAppointment = async (config: AppointmentUpdateConfig) => {
  const result = await axios.post("/api/appointment/update", { config });
  return result.data as Appointment;
};
