import styled from "styled-components";

import { HeaderStyledProps as Props } from "./Header.types";

const HeaderStyled = styled.nav<Props>`
  &.Header {
    display: flex;
    padding: 2rem;
    align-items: center;
    .bold {
      font-weight: bold;
    }

    a {
      text-decoration: none;
      color: gray;
      display: inline-block;
    }

    a + a {
      margin-left: 1rem;
    }

    button + button {
      margin-left: 1rem;
    }

    .left {
      a[data-active="true"] {
        color: black;
      }
    }

    .right {
      margin-left: auto;
      display: flex;

      p {
        font-size: 0.8rem;
      }

      a {
        padding: 0.5rem 1rem;
        border-radius: 3px;
      }

      button {
        border: none;
        cursor: pointer;
        font-size: 1rem;
        margin-left: 1rem;
      }
    }
  }
`;

export default HeaderStyled;
