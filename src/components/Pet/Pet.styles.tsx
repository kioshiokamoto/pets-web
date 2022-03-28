import styled from "styled-components";

import { PetStyledProps as Props } from "./Pet.types";
import { BREAKPOINTS } from "../../utils/generic.utils";

const { tablet } = BREAKPOINTS;

const PetStyled = styled.div<Props>`
  .Pet {
    &__container {
      color: inherit;
      padding: 2rem;
      display: flex;
      align-items: center;
      @media (max-width: ${tablet}px) {
        flex-direction: column;
      }
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
      @media (max-width: ${tablet}px) {
        margin-right: 0;
        margin-bottom: 1rem;
      }
    }
  }
`;

export default PetStyled;
