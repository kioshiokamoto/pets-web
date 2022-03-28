import styled from "styled-components";

import { LayoutStyledProps as Props } from "./Layout.types";
import { BREAKPOINTS } from "../../utils/generic.utils";

const { tablet } = BREAKPOINTS;

const LayoutStyled = styled.div<Props>`
  .Layout {
    &__children {
      padding: 0 2rem 2rem;
      @media (max-width: ${tablet}px) {
        padding-top: 4.2rem;
        width: max-content;
      }
    }
  }
`;

export default LayoutStyled;
