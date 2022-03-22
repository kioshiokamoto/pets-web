import React, { useState } from "react";
import Router from "next/router";
import Layout from "../components/Layout/Layout";

const Pets: React.FC = () => {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [image, setImage] = useState<any>("");

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { name, breed, birthDate: new Date(birthDate), image };
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

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setImage(base64);
  };

  return (
    <Layout>
      <div className="container">
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
          <div className="birth">
            <label>Cumpleaños: </label>
            <input
              autoFocus
              onChange={(e) => setBirthDate(e.target.value)}
              placeholder="Nacimiento"
              type="date"
              value={birthDate}
            />
          </div>

          <input
            type="file"
            name="myFile"
            accept=".jpeg, .png, .jpg"
            onChange={(e) => handleFileUpload(e)}
          />
          <div className="buttons">
            <input
              disabled={!breed || !birthDate || !name}
              type="submit"
              value="Agregar"
            />
            <a className="back" href="#" onClick={() => Router.push("/")}>
              Cancelar
            </a>
          </div>
        </form>
      </div>
      <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 3rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        form {
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 800px;
          align-self: center;
        }

        input[type="text"],
        input[type="file"],
        input[type="date"] {
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
        .birth {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .buttons {
          display: flex;
          align-items: center;
          width: 100%;
          justify-content: space-between;
        }
        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Pets;
