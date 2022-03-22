import React from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Router from "next/router";
import { useSession } from "next-auth/react";

import prisma from "../../lib/prisma";
import Layout from "../../components/Layout/Layout";
import { PetProps } from "../../components/Pet/Pet.types";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.pet.findUnique({
    where: {
      id: Number(params?.id) || -1,
    },
    include: {
      user: {
        select: { name: true, email: true },
      },
    },
  });
  return {
    props: post,
  };
};

async function deletePost(id: number): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: "DELETE",
  });
  Router.push("/");
}

const Pet: React.FC<PetProps> = (props) => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === props.user?.email;

  let title = props.name;
  if (!props.birthDate) {
    title = `${title} (Draft)`;
  }

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <p>De {props?.user?.name || "Unknown author"}</p>
        <ReactMarkdown children={props.breed} />
        {userHasValidSession && postBelongsToUser && (
          <button onClick={() => deletePost(props.id)}>Eliminar</button>
        )}
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Pet;
