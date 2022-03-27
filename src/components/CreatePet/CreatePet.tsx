import React, { useState } from "react";
import { convertToBase64 } from "../../utils/generic.utils";
import Router from "next/router";
import { FormField, Pane, TextInputField } from "evergreen-ui";
import { FileUploader, FileCard, Button } from "evergreen-ui";
import { Select, Spinner, Heading } from "evergreen-ui";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Styles from "./CreatePet.styles";
import { CreatePetProps as Props } from "./CreatePet.types";
import { useGetBreeds } from "../../hooks/pet.hooks";

const CreatePet: React.FC<Props> = (props) => {
  const { submitData } = props;
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [genre, setGenre] = useState<number>();
  const [image, setImage] = useState<any>("");
  const [files, setFiles] = useState([]);
  const [fileRejections, setFileRejections] = useState([]);
  const { data: breedList, isLoading } = useGetBreeds();

  const handleFileUpload = async (files: any) => {
    const file = files[0];
    const base64 = await convertToBase64(file);
    setImage(base64);
  };

  if (isLoading) {
    return (
      <Pane
        display="flex"
        alignItems="center"
        justifyContent="center"
        height={400}
      >
        <Spinner />
      </Pane>
    );
  }

  return (
    <Styles className="CreatePet">
      <Pane
        background="tint2"
        display="flex"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        width="max-content"
        padding={20}
      >
        <form
          onSubmit={(e) =>
            submitData(e, {
              name,
              image,
              genre,
              breed,
              birthDate: birthDate.toISOString(),
            })
          }
        >
          <Heading size={700} marginBottom={24}>
            Agregar mascota
          </Heading>
          <TextInputField
            label="Nombre"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <FormField label="Raza" isRequired>
            <Select
              width="100%"
              marginBottom={24}
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
            >
              <option value={undefined}>Seleccione</option>
              {breedList
                ? breedList.map((breedItem) => (
                    <option value={breedItem.name} key={breedItem.id}>
                      {breedItem.name}
                    </option>
                  ))
                : null}
            </Select>
          </FormField>
          <FormField label="Genero" isRequired>
            <Select
              width="100%"
              marginBottom={24}
              value={genre}
              onChange={(e) => {
                setGenre(+e.target.value);
              }}
            >
              <option value={undefined}>Seleccione</option>
              <option value={0}>Hembra</option>
              <option value={1}>Macho</option>
            </Select>
          </FormField>

          <FormField label="Cumpleaños" isRequired marginBottom={24}>
            <DatePicker
              selected={birthDate}
              onChange={(date: Date) => setBirthDate(date)}
            />
          </FormField>

          <FileUploader
            label="Subir imagen"
            description="Puedes subir 1 archivo. El archivo puede tener hasta 5 MB."
            maxSizeInBytes={5 * 1024 ** 2}
            maxFiles={1}
            onChange={(file) => {
              setFiles([file[0]]);
              handleFileUpload(file);
            }}
            onRejected={(fileRejection) =>
              setFileRejections([fileRejection[0]])
            }
            renderFile={(file) => {
              const { name, size, type } = file ?? {};
              const fileRejection = fileRejections.find(
                (fileRejection) => fileRejection.file === file
              );
              const { message } = fileRejection || {};
              return (
                <FileCard
                  key={name}
                  isInvalid={fileRejection != null}
                  name={name}
                  onRemove={() => {
                    setFiles([]);
                    setFileRejections([]);
                    setImage("");
                  }}
                  sizeInBytes={size}
                  type={type}
                  validationMessage={message}
                  description="5656"
                />
              );
            }}
            values={files}
          />
          <Pane
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Button
              appearance="primary"
              disabled={
                !breed || !birthDate || !name || typeof genre === "undefined"
              }
              type="submit"
              size="large"
            >
              Agregar
            </Button>
            <Button
              appearance="minimal"
              size="large"
              onClick={() => Router.push("/")}
            >
              Cancelar
            </Button>
          </Pane>
        </form>
      </Pane>
      <style jsx>{`
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
    </Styles>
  );
};

CreatePet.defaultProps = {};

export default CreatePet;
