import { AxiosError } from "axios";
import { useMutation, useQuery } from "react-query";

import { AppointmentConfig } from "../interfaces/appointment.types";
import { Appointment } from "../interfaces/appointment.types";
import { getAppointmentByPet } from "../services/appointment.services";
import { createAppointment } from "../services/appointment.services";

export const usePostAppointment = () => {
  return useMutation<Appointment, AxiosError, AppointmentConfig>(
    (config) => createAppointment(config),
    {
      onSuccess: () => {},
    }
  );
};

export const useUpdateAppointment = () => {};

export const useGetAppointmentsByPet = (petId: number) => {
  return useQuery<Promise<Appointment[]>, AxiosError, Appointment[]>(
    ["appointmentsByPet", petId],
    () => getAppointmentByPet(petId)
  );
};
