import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

import Styles from "./Header.styles";
import { HeaderProps as Props } from "./Header.types";

const Header: React.FC<Props> = (props) => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;
  const { data: session, status } = useSession();

  let left = (
    <div className="left">
      <Link href="/">
        <a className="bold" data-active={isActive("/")}>
          Inicio
        </a>
      </Link>
    </div>
  );

  let right = null;

  if (status === "loading") {
    left = (
      <div className="left">
        <Link href="/">
          <a className="bold" data-active={isActive("/")}>
            Inicio
          </a>
        </Link>
      </div>
    );
    right = (
      <div className="right">
        <p>Validando sesión ...</p>
        <style jsx>{`
          .right {
            margin-left: auto;
          }
        `}</style>
      </div>
    );
  }

  if (!session) {
    right = (
      <div className="right">
        <Link href="/api/auth/signin">
          <a data-active={isActive("/signup")}>Ingresar</a>
        </Link>
      </div>
    );
  }

  if (session) {
    left = (
      <div className="left">
        <Link href="/">
          <a className="bold" data-active={isActive("/")}>
            Inicio
          </a>
        </Link>
        <Link href="/pets">
          <a data-active={isActive("/pets")}>Mis mascotas</a>
        </Link>
      </div>
    );
    right = (
      <div className="right">
        <p>
          {session.user.name} ({session.user.email})
        </p>
        <Link href="/create">
          <button>
            <a>Agregar mascota</a>
          </button>
        </Link>
        <button onClick={() => signOut()}>
          <a>Salir</a>
        </button>
      </div>
    );
  }

  return (
    <Styles className="Header">
      {left}
      {right}
    </Styles>
  );
};

Header.defaultProps = {};

export default Header;
