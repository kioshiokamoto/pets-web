import styled from "styled-components";

import { LayoutStyledProps as Props } from "./Layout.types";

const LayoutStyled = styled.div<Props>`
  .Layout {
    &__children {
      padding: 0 2rem 2rem;
    }
  }
`;

export default LayoutStyled;
