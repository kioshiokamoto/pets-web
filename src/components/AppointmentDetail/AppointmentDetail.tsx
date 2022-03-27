import React from "react";

import Styles from "./AppointmentDetail.styles";
import { AppointmentDetailProps as Props } from "./AppointmentDetail.types";

const AppointmentDetail: React.FC<Props> = (props) => {
  const { id, bloodTest, description, image } = props;
  const { medicine, pet, status, symptoms } = props;
  const { name: petName, user } = pet;

  return (
    <Styles className="AppointmentDetail">
      <div className="Appointment__info">
        <p>Id: {id}</p>
        <h2>Nombre: {petName}</h2>
        <h2>Descripcion</h2>
        <p>{description}</p>
        <h2>Sintomas</h2>
        <p>{symptoms}</p>
        <h2>Estatus</h2>
        <p>{status}</p>
        <p>Dueño: {user?.name ?? user?.email}</p>
      </div>
    </Styles>
  );
};

AppointmentDetail.defaultProps = {};

export default AppointmentDetail;
