import React from "react";
import Router from "next/router";
import Image from "next/image";

import Styles from "./Pet.styles";
import { PetProps as Props } from "./Pet.types";
import { dogPlaceholder } from "../../utils/generic.utils";

const Pet: React.FC<Props> = (props) => {
  const { birthDate, breed, id, image, name, user } = props ?? {};
  const authorName = user?.name ? user.name : user.email;

  return (
    <Styles className="Pet">
      <div
        className="Pet__container"
        onClick={() => Router.push("/p/[id]", `/p/${id}`)}
      >
        <div className="Pet__image">
          {image ? (
            <Image src={image} layout="fill" />
          ) : (
            <Image src={dogPlaceholder} layout="fill" />
          )}
        </div>
        <div className="Pet__info">
          <h2>Nombre: {name}</h2>
          <p>Raza: {breed.name}</p>
          <p>
            Cumpleaños:{" "}
            {birthDate && new Date(birthDate).toISOString().split("T")[0]}
          </p>
          <small>De {authorName}</small>
        </div>
      </div>
    </Styles>
  );
};

Pet.defaultProps = {};

export default Pet;
