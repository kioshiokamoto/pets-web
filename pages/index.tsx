import React, { useState } from "react";
import { GetStaticProps } from "next";

import Layout from "../components/Layout";
import Pet, { PetProps } from "../components/Pet";
import prisma from "../lib/prisma";
import Search from "../components/Search";

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
  pets: PetProps[];
};

const Blog: React.FC<Props> = (props) => {
  const { pets } = props;
  const [searchText, setSearchText] = useState("");

  const petsFiltered = pets?.filter((pet) =>
    pet.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Layout>
      <div className="page">
        <h1>Lista de mascotas</h1>
        <main>
          <Search
            placeholder="Buscar"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value.trim())}
          />
          {petsFiltered.map((pet) => (
            <div key={pet.id} className="post">
              <Pet pet={pet} />
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
