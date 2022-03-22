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

      p {
        display: inline-block;
        font-size: 13px;
        padding-right: 1rem;
      }

      a {
        border: 1px solid var(--geist-foreground);
        padding: 0.5rem 1rem;
        border-radius: 3px;
      }

      button {
        border: none;
        cursor: pointer;
      }
    }
  }
`;

export default HeaderStyled;
