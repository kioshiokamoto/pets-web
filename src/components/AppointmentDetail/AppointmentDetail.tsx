import React, { useState } from "react";
import Image from "next/image";
import { Pane, Text, Strong, Badge, Spinner } from "evergreen-ui";
import { FormField, Select, TextInputField, Button } from "evergreen-ui";
import { FileUploader, FileCard } from "evergreen-ui";

import Styles from "./AppointmentDetail.styles";
import { AppointmentDetailProps as Props } from "./AppointmentDetail.types";
import { convertToBase64, rayPlaceholder } from "../../utils/generic.utils";
import { transformStatus } from "../../utils/generic.utils";
import { useGetUser } from "../../hooks/user.hooks";
import { AppointmentStatus } from "../../interfaces/appointment.types";
import { useUpdateAppointment } from "../../hooks/appointment.hooks";
import { useRouter } from "next/router";

const statusOptions: AppointmentStatus[] = ["BOOKED", "ATTENDED", "CANCELLED"];

const AppointmentDetail: React.FC<Props> = (props) => {
  const { id, bloodTest, description, image: actualImage } = props;
  const { medicine: actualMedicine, pet } = props;
  const { status: actualStatus, symptoms } = props;
  const { name: petName, user } = pet;
  const { data: userData, isLoading } = useGetUser();
  const { role } = userData ?? {};
  const [status, setStatus] = useState(actualStatus);
  const [blood, setBlood] = useState(bloodTest);
  const [medicine, setMedicine] = useState(actualMedicine);
  const [image, setImage] = useState<any>("");
  const [files, setFiles] = useState([]);
  const [fileRejections, setFileRejections] = useState([]);

  const { mutate: updateAppointment } = useUpdateAppointment();
  const router = useRouter();

  const handleFileUpload = async (files: any) => {
    const file = files[0];
    const base64 = await convertToBase64(file);
    setImage(base64);
  };

  const updateHandler = () => {
    updateAppointment(
      { id, bloodTest: blood, image, medicine, status },
      {
        onSuccess: () => {
          router.push("/appointments");
        },
      }
    );
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
    <Styles className="AppointmentDetail">
      <Pane
        display="flex"
        flexDirection="column"
        background="tint2"
        paddingX={16}
        borderRadius={4}
      >
        <Pane display="flex" alignItems="center" justifyContent="space-between">
          <Text size={600}>
            <Strong size={600}>ID:</Strong> #{id}
          </Text>
          <Text size={600}>
            <Strong size={600}>Paciente:</Strong> {petName}
          </Text>
          {role && role === "CLIENT" ? (
            <Text size={600}>
              <Strong size={600}>Estatus:</Strong>{" "}
              {transformStatus(actualStatus)}
            </Text>
          ) : null}
          {role && role === "VETERINARY" ? (
            <Pane>
              <FormField label="Estatus">
                <Select
                  width="100%"
                  marginBottom={24}
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value as AppointmentStatus)
                  }
                >
                  <option value={undefined}>Seleccione</option>
                  {statusOptions.map((status, idx) => (
                    <option value={status} key={idx}>
                      {transformStatus(status)}
                    </option>
                  ))}
                </Select>
              </FormField>
            </Pane>
          ) : null}
        </Pane>
        <Pane>
          <Strong size={600}>Dueño:</Strong>
          <Text size={600} marginLeft={16}>
            {user?.name ?? user?.email}
          </Text>
        </Pane>

        <Pane>
          <Strong size={600}>Descripción:</Strong>
          <Text size={600} marginLeft={16}>
            {description}
          </Text>
        </Pane>
        <Pane display="flex" alignItems="center" flexWrap="wrap">
          <Strong size={600}>Sintomas:</Strong>
          {symptoms.split(",").map((symptom, idx) => {
            if (idx === 0) return null;
            return (
              <Badge
                key={idx}
                width="max-content"
                paddingY={12}
                marginX={4}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {symptom}
              </Badge>
            );
          })}
        </Pane>
        <Pane>
          {role && role === "CLIENT" ? (
            <>
              <Strong size={600}>Examen de sangre:</Strong>
              <Text size={600} marginLeft={16}>
                {bloodTest ?? `No hay información`}
              </Text>
            </>
          ) : null}
          {role && role === "VETERINARY" ? (
            <Pane>
              <TextInputField
                label="Examen de sangre: "
                required
                value={blood}
                onChange={(e) => setBlood(e.target.value)}
                autoFocus
              />
            </Pane>
          ) : null}
        </Pane>
        <Pane>
          {role && role === "CLIENT" ? (
            <>
              <Strong size={600}>Medicina:</Strong>
              <Text size={600} marginLeft={16}>
                {actualMedicine ?? `No hay información`}
              </Text>
            </>
          ) : null}
          {role && role === "VETERINARY" ? (
            <Pane>
              <TextInputField
                label="Medicina: "
                value={medicine}
                onChange={(e) => setMedicine(e.target.value)}
                autoFocus
              />
            </Pane>
          ) : null}
        </Pane>
        <Pane>
          <Strong size={600}>Radiografía:</Strong>
          {role && role === "CLIENT" ? (
            <div className="AppointmentDetail__image">
              {actualImage ? (
                <Image src={actualImage} layout="fill" />
              ) : (
                <Image src={rayPlaceholder} layout="fill" />
              )}
            </div>
          ) : null}
          {role && role === "VETERINARY" ? (
            <>
              {" "}
              {actualImage ? (
                <div className="AppointmentDetail__image">
                  <Image src={actualImage} layout="fill" />
                </div>
              ) : (
                <>
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
                </>
              )}
            </>
          ) : null}
        </Pane>
        {role && role === "VETERINARY" ? (
          <Pane>
            <Button appearance="primary" size="large" onClick={updateHandler}>
              Actualizar
            </Button>
          </Pane>
        ) : null}
      </Pane>
    </Styles>
  );
};

AppointmentDetail.defaultProps = {};

export default AppointmentDetail;
