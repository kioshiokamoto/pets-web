import { useState } from "react";
import { Pane, Tablist, Tab, Spinner } from "evergreen-ui";

import Layout from "../components/Layout/Layout";
import { AppointmentStatus } from "../interfaces/appointment.types";
import { transformStatus } from "../utils/generic.utils";
import { useGetAppointmentsByCategory } from "../hooks/appointment.hooks";
import Appointment from "../components/Appointment/Appointment";
import AppointmentStyled from "../components/Appointment/Appointment.styles";

type Props = {};

const tabs: AppointmentStatus[] = ["BOOKED", "ATTENDED", "CANCELLED"];

const AppointmentsPage: React.FC<Props> = (props) => {
  const [category, setCategory] = useState<AppointmentStatus>("BOOKED");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { data: appointments, isLoading } =
    useGetAppointmentsByCategory(category);

  if (isLoading) {
    return (
      <Pane
        display="flex"
        alignItems="center"
        justifyContent="center"
        height={400}
      >
        <Spinner />
      </Pane>
    );
  }

  return (
    <Layout role="VETERINARY">
      <AppointmentStyled className="Appointment">
        <Pane className="Appointment__container">
          <Tablist className="Appointment__container-tabs">
            {tabs.map((tab, index) => (
              <Tab
                key={tab}
                id={tab}
                onSelect={() => {
                  setSelectedIndex(index);
                  setCategory(tab);
                }}
                isSelected={index === selectedIndex}
                aria-controls={`panel-${tab}`}
              >
                {transformStatus(tab)}
              </Tab>
            ))}
          </Tablist>
          <Pane display="flex" flexDirection="column" width="100%">
            {appointments
              ? appointments.map((appointment, idx) => (
                  <Appointment {...appointment} key={idx} />
                ))
              : null}
          </Pane>
        </Pane>
      </AppointmentStyled>
    </Layout>
  );
};
export default AppointmentsPage;
