import React, { useState } from "react";
import Image from "next/image";
import { Pane, Text } from "evergreen-ui";
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
      <div className="PetInformation__container">
        <div className="PetInformation__container-left">
          <Pane
            display="flex"
            flexDirection="column"
            alignItems="center"
            background="tint2"
            marginBottom={32}
            padding={16}
            borderRadius={4}
            >
            <Text size="600" color="default">
              {name}
            </Text>
            <div className="PetInformation__image">
              {image ? (
                <Image src={image} layout="fill" />
              ) : (
                <Image src={dogPlaceholder} layout="fill" />
              )}
            </div>

            <Text size="600" color="default">
              De {userName ?? email}
            </Text>
            <Text size="600" color="default">
              {breedName}
            </Text>
            <Text size="600" color="default">
              {new Date(birthDate).toISOString().split("T")[0]}
            </Text>
          </Pane>
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
                marginY={16}
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
        </div>
        <Pane width="100%" className="PetInformation__appointments">
          <div>Citas de {name}</div>
          {petBelongsToUser
            ? appointments.map((appointment, idx) => (
                <Appointment {...appointment} key={idx} />
              ))
            : null}
          {!petBelongsToUser ? (
            <Pane
              background="tint2"
              display="flex"
              padding={32}
              marginY={16}
              alignItems="center"
              justifyContent="center"
            >
              <Text>Debes ser dueño de {name} para ver sus citas</Text>
            </Pane>
          ) : null}
        </Pane>
      </div>
    </Styles>
  );
};

PetInformation.defaultProps = {};

export default PetInformation;
