import React from "react";
import { GetServerSideProps } from "next";
import Router from "next/router";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Pane, Spinner } from "evergreen-ui";

import prisma from "../../lib/prisma";
import Layout from "../../components/Layout/Layout";
import { PetProps } from "../../components/Pet/Pet.types";
import PetInformation from "../../components/PetInformation/PetInformation";
import { usePostAppointment } from "../../hooks/appointment.hooks";
import { useGetAppointmentsByPet } from "../../hooks/appointment.hooks";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.pet.findUnique({
    where: {
      id: Number(params?.id) || -1,
    },
    include: {
      user: {
        select: { name: true, email: true },
      },
      breed: {
        select: { name: true },
      },
    },
  });
  return {
    props: post,
  };
};

const Pet: React.FC<PetProps> = (props) => {
  const { data: session } = useSession();
  const { mutate: postAppointment } = usePostAppointment();
  const { data: appointments, isLoading } = useGetAppointmentsByPet(props.id);
  const userHasValidSession = Boolean(session);
  const petBelongsToUser = session?.user?.email === props.user?.email;

  const deletePost = async (id: number) => {
    await axios.delete(`/api/post/${id}`);
    Router.push("/");
  };

  const createAppointment = async (description: string, symptoms: string) => {
    postAppointment({ description, symptoms, petId: props.id });
  };

  if (isLoading) {
    return (
      <Layout>
        <Pane
          display="flex"
          alignItems="center"
          justifyContent="center"
          height={400}
        >
          <Spinner />
        </Pane>
      </Layout>
    );
  }

  return (
    <Layout>
      <PetInformation
        pet={props}
        userHasValidSession={userHasValidSession}
        petBelongsToUser={petBelongsToUser}
        deletePost={deletePost}
        createAppointment={createAppointment}
        appointments={appointments}
      />
    </Layout>
  );
};

export default Pet;
