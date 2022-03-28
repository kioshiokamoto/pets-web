import styled from "styled-components";

import { BREAKPOINTS } from "../../utils/generic.utils";
import { HeaderStyledProps as Props } from "./Header.types";

const { tablet } = BREAKPOINTS;

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
    .mobile {
      display: none;
    }

    @media (max-width: ${tablet}px) {
      .left {
        display: none;
      }
      .right {
        display: none;
      }
      .mobile {
        display: block;
        /* Position and sizing of burger button */
        .bm-burger-button {
          position: fixed;
          width: 24px;
          height: 18px;
          right: 36px;
          top: 36px;
        }

        /* Color/shape of burger icon bars */
        .bm-burger-bars {
          background: #373a47;
        }

        /* Color/shape of burger icon bars on hover*/
        .bm-burger-bars-hover {
          background: #a90000;
        }

        /* Position and sizing of clickable cross button */
        .bm-cross-button {
          height: 24px;
          width: 24px;
        }

        /* Color/shape of close button cross */
        .bm-cross {
          background: #bdc3c7;
        }

        .bm-menu-wrap {
          position: fixed;
          height: 100%;
        }

        /* General sidebar styles */
        .bm-menu {
          background: #373a47;
          padding: 2.5em 1.5em 0;
          font-size: 1.15em;
        }

        /* Morph shape necessary with bubble or elastic */
        .bm-morph-shape {
          fill: #373a47;
        }

        /* Wrapper for item list */
        .bm-item-list {
          color: #b8b7ad;
          /* padding: 0.8em; */
          display: flex;
          flex-direction: column;
          align-items: center;
          a {
            margin-left: 0;
            padding: 1rem;
            display: flex;
            align-content: center;
            justify-content: center;
            width:100%;
          }
        }

        /* Individual item */
        .bm-item {
          display: inline-block;
        }

        /* Styling of overlay */
        .bm-overlay {
          background: rgba(0, 0, 0, 0.3);
        }
      }
      display: block;
      padding: 0;
    }
  }
`;

export default HeaderStyled;
