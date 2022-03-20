import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import prisma from "../lib/prisma";

export const getStaticProps: GetStaticProps = async () => {
  const pets = await prisma.pet.findMany({
    include: {
      user: {
        select: { name: true },
      },
    },
  });

  return { props: { pets } };
};

type Props = {
  pets: PostProps[];
};

const Blog: React.FC<Props> = (props) => {
  const { pets } = props;

  return (
    <Layout>
      <div className="page">
        <h1>Lista de mascotas</h1>
        <main>
          {pets.map((pet) => (
            <div key={pet.id} className="post">
              <Post post={pet} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Blog;
