import { createGlobalStyle } from "styled-components";

import typography from "./typography";
import base from "./base";
import cssVariables from "../util/cssVariables";
import themes from "../theme";

const getCSSVariables = (theme: any) => {
  const { functions, mixins, ...rest } = theme;
  return cssVariables(rest);
};

const GlobalStyle = createGlobalStyle`
    ${(props) => getCSSVariables(props.theme || themes.light)}
    ${base}
    ${typography}
`;

export default GlobalStyle;
