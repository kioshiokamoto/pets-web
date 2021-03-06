import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { slide as Menu } from "react-burger-menu";

import Styles from "./Header.styles";
import { HeaderProps as Props } from "./Header.types";
import { useGetUser } from "../../hooks/user.hooks";

const Header: React.FC<Props> = (props) => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;
  const { data: session, status } = useSession();
  const { data: user, isLoading } = useGetUser();

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

  if (status === "loading" || isLoading) {
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

  if (!session || (!isLoading && !user)) {
    right = (
      <div className="right">
        <Link href="/api/auth/signin">
          <a data-active={isActive("/signup")}>Ingresar</a>
        </Link>
      </div>
    );
  }

  if (user) {
    left = (
      <div className="left">
        <Link href="/">
          <a className="bold" data-active={isActive("/")}>
            Inicio
          </a>
        </Link>
        {user.role === "CLIENT" ? (
          <>
            <Link href="/pets">
              <a data-active={isActive("/pets")}>Mis mascotas</a>
            </Link>
            <Link href="/my-appointments">
              <a data-active={isActive("/my-appointments")}>Mis citas</a>
            </Link>
          </>
        ) : null}
      </div>
    );
    right = (
      <div className="right">
        <p>
          {user.name} ({user.email}) - {user.role}
        </p>
        {user.role === "CLIENT" ? (
          <Link href="/create">
            <button>
              <a>Agregar mascota</a>
            </button>
          </Link>
        ) : null}
        {user.role === "VETERINARY" ? (
          <Link href="/appointments">
            <button>
              <a>Citas pendientes</a>
            </button>
          </Link>
        ) : null}
        {user.role === "ADMIN" ? (
          <Link href="/admin">
            <button>
              <a>Admin panel</a>
            </button>
          </Link>
        ) : null}
        <button onClick={() => signOut()}>
          <a>Salir</a>
        </button>
      </div>
    );
  }

  const mobile = (
    <div className="mobile">
      <Menu right width={"100%"} className={"hamburger"}>
        <Link href="/">
          <a className="bold" data-active={isActive("/")}>
            Inicio
          </a>
        </Link>
        {user?.role === "CLIENT" ? (
          <>
            <Link href="/pets">
              <a data-active={isActive("/pets")}>Mis mascotas</a>
            </Link>
            <Link href="/my-appointments">
              <a data-active={isActive("/my-appointments")}>Mis citas</a>
            </Link>
            <Link href="/create">
              <a data-active={isActive("/create")}>Agregar mascota</a>
            </Link>
          </>
        ) : null}
        {user?.role === "VETERINARY" ? (
          <Link href="/appointments">
            <a>Citas pendientes</a>
          </Link>
        ) : null}
        {user ? (
          <a
            style={{ marginTop: "auto", marginBottom: "2rem", display: "flex" }}
            onClick={() => signOut()}
          >
            Salir
          </a>
        ) : (
          <Link href="/api/auth/signin">
            <a
              style={{ marginTop: "auto", marginBottom: "2rem" }}
              data-active={isActive("/signup")}
            >
              Ingresar
            </a>
          </Link>
        )}
      </Menu>
    </div>
  );

  return (
    <Styles className="Header">
      {left}
      {right}
      {mobile}
    </Styles>
  );
};

Header.defaultProps = {};

export default Header;
