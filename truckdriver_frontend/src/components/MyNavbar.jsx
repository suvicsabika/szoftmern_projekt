import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo.jsx";

import "./MyNavbar.css";

export default function MyNavbar() {
  return (
    <Navbar shouldHideOnScroll id="navbar">
      <NavbarBrand>
        <AcmeLogo />
        <Link href="../" color="foreground"><p className="text-inherit" id="main-link">Szoft. Mérn. Projekt</p></Link>
      </NavbarBrand>

      <NavbarContent className=" sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link href="Records" color="foreground" id="nyilvantartas">
            Nyilvántartás
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="./Home" aria-current="page" id="nyilvantartas"> 
            Kezdőoldal
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="./About" color="foreground" id="nyilvantartas">
            Leírás
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className=" lg:flex">
          <Link href="./Login" id="login">Bejelentkezés</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="./Register" variant="flat" id="register">
            Regisztráció
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
