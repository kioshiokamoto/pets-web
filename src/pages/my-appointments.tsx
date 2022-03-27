import { Pane, SearchInput } from "evergreen-ui";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useState } from "react";

import AppointmentItem from "../components/Appointment/Appointment";
import Layout from "../components/Layout/Layout";
import { Appointment } from "../interfaces/appointment.types";
import prisma from "../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  const appointments = await prisma.appointment.findMany({
    where: {
      pet: {
        user: {
          email: session.user.email,
        },
      },
    },
    include: {
      pet: {
        include: { user: { select: { name: true, email: true } } },
      },
    },
  });

  return { props: { appointments } };
};

type Props = {
  appointments: Appointment[];
};

const MyAppointmentsPage: React.FC<Props> = (props) => {
  const { appointments } = props;
  const [searchText, setSearchText] = useState("");

  const appointmentsFiltered = appointments?.filter((appointment) =>
    appointment?.pet.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Layout role="CLIENT">
      <SearchInput
        onChange={(e) => setSearchText(e.target.value)}
        value={searchText}
        width="100%"
        placeholder="Ingresa el nombre de la mascota"
      />
      <Pane display="flex" flexDirection="column">
        {appointmentsFiltered.map((appointment) => (
          <AppointmentItem {...appointment} />
        ))}
      </Pane>
    </Layout>
  );
};
export default MyAppointmentsPage;
