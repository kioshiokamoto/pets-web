import React from "react";
import Router from "next/router";
import Image from "next/image";

const dogPlaceholder =
  "data:image/png;base64,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";

export type PetProps = {
  id: number;
  name: string;
  user: {
    name: string;
    email: string;
  } | null;
  breed: string;
  image: string;
  birthDate: any;
};

const Pet: React.FC<{ pet: PetProps }> = ({ pet }) => {
  const authorName = pet?.user?.name ? pet.user.name : "Desconocido";

  return (
    <div
      className="container"
      onClick={() => Router.push("/p/[id]", `/p/${pet.id}`)}
    >
      <div className="image">
        {pet?.image ? (
          <Image src={pet?.image} layout="fill" />
        ) : (
          <Image src={dogPlaceholder} layout="fill" />
        )}
      </div>
      <div className="info">
        <h2>Nombre: {pet?.name}</h2>
        <p>Raza: {pet?.breed}</p>
        <p>
          Cumpleaños:{" "}
          {pet?.birthDate &&
            new Date(pet?.birthDate).toISOString().split("T")[0]}
        </p>
        <small>De {authorName}</small>
      </div>
      <style jsx>{`
        .container {
          color: inherit;
          padding: 2rem;
          display: flex;
          align-items: center;
        }
        .info {
          display: flex;
          flex-direction: column;
        }
        .image {
          width: 6rem;
          height: 6rem;
          border-radius: 50%;
          overflow: hidden;
          position: relative;
          margin-right: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Pet;