import React from "react";
import Router from "next/router";
import { Card, Pane, Badge, Text, Strong } from "evergreen-ui";

import Styles from "./Appointment.styles";
import { AppointmentProps as Props } from "./Appointment.types";
import { transformStatus } from "../../utils/generic.utils";

const Appointment: React.FC<Props> = (props) => {
  const { id, description } = props;
  const { pet, status, symptoms } = props;
  const { name: petName, user } = pet;

  return (
    <Styles className="Appointment">
      <Card
        onClick={() => Router.push("/appointment/[id]", `/appointment/${id}`)}
        display="flex"
        flexDirection="column"
        background="tint2"
        width="100%"
        marginY={12}
        borderRadius={4}
        hoverElevation={1}
        padding={16}
        cursor="pointer"
      >
        <Pane display="flex" alignItems="center" justifyContent="space-between">
          <Text size={600}>
            <Strong size={600}>ID:</Strong> #{id}
          </Text>
          <Text size={600}>
            <Strong size={600}>Paciente:</Strong> {petName}
          </Text>
          <Text size={600}>
            <Strong size={600}>Estatus:</Strong> {transformStatus(status)}
          </Text>
        </Pane>
        <Pane>
          <Strong size={600}>Dueño:</Strong>
          <Text size={600} marginLeft={16}>
            {user?.name ?? user?.email}
          </Text>
        </Pane>
        <Pane>
          <Strong size={600}>Descripción:</Strong>
          <Text size={600} marginLeft={16}>
            {description}
          </Text>
        </Pane>
        <Pane display="flex" alignItems="center" flexWrap="wrap">
          <Strong size={600}>Sintomas:</Strong>
          {symptoms.split(",").map((symptom, idx) => {
            if (idx === 0) return null;
            return (
              <Badge
                key={idx}
                width="max-content"
                paddingY={12}
                marginX={4}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {symptom}
              </Badge>
            );
          })}
        </Pane>
      </Card>
    </Styles>
  );
};

Appointment.defaultProps = {};

export default Appointment;
