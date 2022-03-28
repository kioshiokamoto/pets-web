import styled from "styled-components";

import { PetInformationStyledProps as Props } from "./PetInformation.types";
import { BREAKPOINTS } from "../../utils/generic.utils";

const { tablet } = BREAKPOINTS;

const PetInformationStyled = styled.div<Props>`
  .PetInformation {
    &__image {
      width: 6rem;
      height: 6rem;
      border-radius: 50%;
      overflow: hidden;
      position: relative;
    }

    &__container {
      display: flex;
      @media (max-width: ${tablet}px) {
        flex-direction: column;
        width: 100%;
      }

      &-left {
        display: flex;
        flex-direction: column;
        min-width: 400px;
        @media (max-width: ${tablet}px) {
          width: 100%;
        }
      }
    }
    &__appointments {
      margin-left: 24px;
      @media (max-width: ${tablet}px) {
        margin-left: 0px;
      }
    }
  }
`;

export default PetInformationStyled;
