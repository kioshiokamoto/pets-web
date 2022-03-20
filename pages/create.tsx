import React, { useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";

const Pets: React.FC = () => {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { name, breed, birthDate: new Date(birthDate) };
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
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>Agregar mascota</h1>
          <input
            autoFocus
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre"
            type="text"
            value={name}
          />
          <input
            autoFocus
            onChange={(e) => setBreed(e.target.value)}
            placeholder="Raza"
            type="text"
            value={breed}
          />
          <label>Cumpleaños: </label>
          <input
            autoFocus
            onChange={(e) => setBirthDate(e.target.value)}
            placeholder="Nacimiento"
            type="date"
            value={birthDate}
          />

          <input
            disabled={!breed || !birthDate || !name}
            type="submit"
            value="Agregar"
          />
          <a className="back" href="#" onClick={() => Router.push("/")}>
            Cancelar
          </a>
        </form>
      </div>
      <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type="text"],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type="submit"] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Pets;
