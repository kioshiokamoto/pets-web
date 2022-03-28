import React, { useState } from "react";
import { Pane, TagInput, TextareaField } from "evergreen-ui";
import { Button, FormField, Heading } from "evergreen-ui";

import Styles from "./AppointmentForm.styles";
import { AppointmentFormProps as Props } from "./AppointmentForm.types";

const AppointmentForm: React.FC<Props> = (props) => {
  const { setVisibleBooking, createAppointment } = props;
  const [description, setDescription] = useState("");
  const [symptoms, setSymptoms] = useState([""]);

  const resetData = () => {
    setDescription("");
    setSymptoms([""]);
    setVisibleBooking(false);
  };

  return (
    <Styles className="AppointmentForm">
      <Pane
        background="tint2"
        display="flex"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        padding={20}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createAppointment(description, symptoms.join(","));
            resetData();
          }}
        >
          <Heading
            size={600}
            marginBottom={24}
            paddingX={48}
            width="max-content"
          >
            Agendamiento de cita
          </Heading>
          <TextareaField
            label="Descripción"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            autoFocus
          />
          <FormField label="Síntomas" isRequired marginBottom={24}>
            <TagInput
              inputProps={{ placeholder: "Agregar..." }}
              values={symptoms}
              width="100%"
              onChange={(values) => {
                setSymptoms(values);
              }}
            />
          </FormField>
          <Pane
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Button
              appearance="primary"
              disabled={!symptoms || !description}
              type="submit"
              size="large"
            >
              Agendar
            </Button>
            <Button appearance="minimal" size="large" onClick={() => {}}>
              Cancelar
            </Button>
          </Pane>
        </form>
      </Pane>
    </Styles>
  );
};

AppointmentForm.defaultProps = {};

export default AppointmentForm;
