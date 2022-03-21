import React from "react";
import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/react";

import Layout from "../components/Layout";
import Pet, { PetProps } from "../components/Pet";
import prisma from "../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { pets: [] } };
  }

  const pets = await prisma.pet.findMany({
    where: {
      user: { email: session.user.email },
    },
    include: {
      user: {
        select: { name: true },
      },
    },
  });
  return {
    props: { pets },
  };
};

type Props = {
  pets: PetProps[];
};

const MyPets: React.FC<Props> = (props) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Layout>
        <h1>Mis mascotas</h1>
        <div>Necesita estar autenticado para ver esta página.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page">
        <h1>Mis mascotas</h1>
        <main>
          {props.pets.map((pet) => (
            <div key={pet.id} className="pet">
              <Pet pet={pet} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .pet {
          background: var(--geist-background);
          transition: box-shadow 0.1s ease-in;
        }

        .pet:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .pet + .pet {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default MyPets;
