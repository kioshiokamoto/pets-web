import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { AppointmentUpdateConfig } from "../interfaces/appointment.types";
import { AppointmentStatus } from "../interfaces/appointment.types";
import { AppointmentConfig } from "../interfaces/appointment.types";
import { Appointment } from "../interfaces/appointment.types";
import { putAppointment } from "../services/appointment.services";
import { getAppointmentsByCategory } from "../services/appointment.services";
import { getAppointmentByPet } from "../services/appointment.services";
import { createAppointment } from "../services/appointment.services";

export const usePostAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation<Appointment, AxiosError, AppointmentConfig>(
    (config) => createAppointment(config),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("appointmentsByPet");
        queryClient.invalidateQueries("appointmentsByCategory");
      },
    }
  );
};

export const useUpdateAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation<Appointment, AxiosError, AppointmentUpdateConfig>(
    (config) => putAppointment(config),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("appointmentsByPet");
        queryClient.invalidateQueries("appointmentsByCategory");
      },
    }
  );
};

export const useGetAppointmentsByPet = (petId: number) => {
  return useQuery<Promise<Appointment[]>, AxiosError, Appointment[]>(
    ["appointmentsByPet", petId],
    () => getAppointmentByPet(petId)
  );
};

export const useGetAppointmentsByCategory = (category: AppointmentStatus) => {
  return useQuery<Promise<Appointment[]>, AxiosError, Appointment[]>(
    ["appointmentsByCategory", category],
    () => getAppointmentsByCategory(category)
  );
};
