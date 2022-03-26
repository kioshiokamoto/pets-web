import React from "react";

import { LayoutProps as Props } from "./Layout.types";
import Styles from "./Layout.styles";
import Header from "../Header/Header";
import { useGetUser } from "../../hooks/user.hooks";
import { useRouter } from "next/router";

const Layout: React.FC<Props> = (props) => {
  const { role } = props;
  const { data } = useGetUser();
  const router = useRouter();

  if (role && data) {
    const authorized = role === data.role;
    if (!authorized) router.push("/");
  }

  return (
    <Styles className="Layout">
      <Header />
      <div className="Layout__children">{props.children}</div>
    </Styles>
  );
};

Layout.defaultProps = {};

export default Layout;
