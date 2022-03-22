import styled from "styled-components";

import { SearchStyledProps as Props } from "./Search.types";

const SearchStyled = styled.div<Props>`
  .Search {
    &__container {
      display: flex;
      input {
        width: 100%;
        padding: 0.5rem;
        margin: 0.5rem 0;
        border-radius: 0.25rem;
        border: 0.125rem solid rgba(0, 0, 0, 0.2);
        outline: none;
      }
    }
  }
`;

export default SearchStyled;
