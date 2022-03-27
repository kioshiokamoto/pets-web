import React from "react";
import { Pane, Spinner } from "evergreen-ui";

import { LayoutProps as Props } from "./Layout.types";
import Styles from "./Layout.styles";
import Header from "../Header/Header";
import { useGetUser } from "../../hooks/user.hooks";
import { useRouter } from "next/router";

const Layout: React.FC<Props> = (props) => {
  const { role } = props;
  const { data, isLoading } = useGetUser();
  const router = useRouter();

  if (role && data) {
    const authorized = role === data.role;
    if (!authorized) router.push("/");
  }
  if (isLoading) {
    return (
      <Pane
        display="flex"
        alignItems="center"
        justifyContent="center"
        height={400}
      >
        <Spinner />
      </Pane>
    );
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
