import React from "react";

import { LayoutProps as Props } from "./Layout.types";
import Styles from "./Layout.styles";
import Header from "../Header/Header";

const Layout: React.FC<Props> = (props) => {
  return (
    <Styles className="Layout">
      <Header />
      <div className="Layout__children">{props.children}</div>
    </Styles>
  );
};

Layout.defaultProps = {};

export default Layout;
