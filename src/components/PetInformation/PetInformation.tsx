import React, { useState } from "react";
import Image from "next/image";
import { Pane } from "evergreen-ui";
import { Button } from "evergreen-ui";

import Styles from "./PetInformation.styles";
import { PetInformationProps as Props } from "./PetInformation.types";
import { dogPlaceholder } from "../../utils/generic.utils";
import AppointmentForm from "../AppointmentForm/AppointmentForm";
import Appointment from "../Appointment/Appointment";

const PetInformation: React.FC<Props> = (props) => {
  const { pet, petBelongsToUser, userHasValidSession } = props;
  const { appointments } = props;
  const { deletePost, createAppointment } = props;
  const { birthDate, breed, name, image, user, id } = pet;
  const { name: breedName } = breed;
  const { email, name: userName } = user;

  const [visibleBooking, setVisibleBooking] = useState(false);

  return (
    <Styles className="PetInformation">
      <Pane display="flex">
        <Pane display="flex" flexDirection="column" minWidth={400}>
          <h2>{name}</h2>
          <div className="PetInformation__image">
            {image ? (
              <Image src={image} layout="fill" />
            ) : (
              <Image src={dogPlaceholder} layout="fill" />
            )}
          </div>

          <p>De {userName ?? email}</p>
          <p>{breedName}</p>
          <p>{new Date(birthDate).toISOString().split("T")[0]}</p>
          {userHasValidSession && petBelongsToUser && (
            <>
              <Button
                type="submit"
                size="large"
                onClick={() => setVisibleBooking((prev) => !prev)}
              >
                Agendar Cita
              </Button>
              <Button
                intent="danger"
                size="large"
                onClick={() => deletePost(id)}
              >
                Eliminar
              </Button>
            </>
          )}
          {visibleBooking ? (
            <AppointmentForm
              setVisibleBooking={setVisibleBooking}
              createAppointment={createAppointment}
            />
          ) : null}
        </Pane>
        <Pane width="100%" marginLeft={24}>
          <div>Citas de {name}</div>
          {appointments.map((appointment) => (
            <Appointment {...appointment} />
          ))}
        </Pane>
      </Pane>
    </Styles>
  );
};

PetInformation.defaultProps = {};

export default PetInformation;
