import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

import AppointmentDetail from "../../components/AppointmentDetail/AppointmentDetail";
import Layout from "../../components/Layout/Layout";
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
            select: { name: true, email: true, role: true },
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
  const { data: session } = useSession();
  const router = useRouter();
  const userHasValidSession = Boolean(session);
  const petBelongsToUser = session?.user?.email === props.pet.user?.email;

  useEffect(() => {
    if (!petBelongsToUser && props.pet.user?.role !== "VETERINARY") {
      router.push("/");
    }
  }, []);

  return (
    <Layout>
      <AppointmentDetail
        {...props}
        userHasValidSession={userHasValidSession}
        petBelongsToUser={petBelongsToUser}
      />
    </Layout>
  );
};

export default AppointmentPage;
