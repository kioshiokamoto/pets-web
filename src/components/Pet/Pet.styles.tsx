import styled from "styled-components";

import { PetStyledProps as Props } from "./Pet.types";

const PetStyled = styled.div<Props>`
  .Pet {
    &__container {
      color: inherit;
      padding: 2rem;
      display: flex;
      align-items: center;
    }
    &__info {
      display: flex;
      flex-direction: column;
    }
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

export default PetStyled;
