import styled from "styled-components";

import { PetInformationStyledProps as Props } from "./PetInformation.types";

const PetInformationStyled = styled.div<Props>`
  .PetInformation {
    &__image {
      width: 6rem;
      height: 6rem;
      border-radius: 50%;
      overflow: hidden;
      position: relative;
      margin-right: 2rem;
    }
  }
`;

export default PetInformationStyled;
