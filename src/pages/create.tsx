import React from "react";
import Router from "next/router";
import Layout from "../components/Layout/Layout";
import { CreatePet as CreatePetInterface } from "../interfaces/pet.types";
import CreatePet from "../components/CreatePet/CreatePet";

const Pets: React.FC = () => {
  const submitData = async (
    e: React.SyntheticEvent,
    pet: CreatePetInterface
  ) => {
    e.preventDefault();
    try {
      const body = { ...pet };
      await fetch("/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/pets");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout role="CLIENT">
      <CreatePet submitData={submitData} />
    </Layout>
  );
};

export default Pets;
