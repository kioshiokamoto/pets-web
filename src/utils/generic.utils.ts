import { AppointmentStatus } from "../interfaces/appointment.types";

export const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export const dogPlaceholder =
  "data:image/png;base64,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";

export const rayPlaceholder =
  "data:image/jpeg;base64,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";

export const transformStatus = (status: AppointmentStatus) => {
  switch (status) {
    case "BOOKED":
      return "Agendada";
    case "ATTENDED":
      return "Atendida";
    case "CANCELLED":
      return "Cancelada";
    default:
      return "Agendada";
  }
};

export const BREAKPOINTS = {
  mobile: 420,
  tablet: 768,
  desktop: 1024,
  wide: 1440,
  hd: 2560,
};