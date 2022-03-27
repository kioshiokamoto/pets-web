import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import AppointmentDetail from "../../components/AppointmentDetail/AppointmentDetail";
import { Appointment } from "../../interfaces/appointment.types";
import prisma from "../../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
  res,
}) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    res.setHeader("Location", `/`);
    return { props: {} };
  }

  const appointment = await prisma.appointment.findUnique({
    where: {
      id: Number(params?.id) || -1,
    },
    include: {
      pet: {
        select: {
          name: true,
          user: {
            select: { name: true, email: true },
          },
        },
      },
    },
  });
  return {
    props: appointment,
  };
};

const AppointmentPage: React.FC<Appointment> = (props) => {
  return (
    <>
      <AppointmentDetail {...props} />
    </>
  );
};

export default AppointmentPage;
