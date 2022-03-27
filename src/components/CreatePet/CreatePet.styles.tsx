import styled from "styled-components";

import { CreatePetStyledProps as Props } from "./CreatePet.types";

const CreatePetStyled = styled.div<Props>`
  &.CreatePet {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default CreatePetStyled;
