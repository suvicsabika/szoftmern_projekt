import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo.jsx";

import "./MyNavbar.css";

export default function MyNavbar() {
  return (
    <Navbar shouldHideOnScroll id="navbar">
      <NavbarBrand>
        <AcmeLogo />
        <Link href="../" color="foreground"><p className="font-bold text-inherit">Szoft. Mérn. Projekt</p></Link>
      </NavbarBrand>

      <NavbarContent className=" sm:flex gap-4" justify="center">
        <NavbarItem id="nyilvantartas">
          <Link href="Records" color="foreground">
            Nyilvántartás
          </Link>
        </NavbarItem>
        <NavbarItem isActive id="kezdooldal">
          <Link href="./Home" aria-current="page">
            Kezdőoldal
          </Link>
        </NavbarItem>
        <NavbarItem id="leiras">
          <Link href="./About" color="foreground">
            Leírás
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className=" lg:flex">
          <Link href="./Login">Bejelentkezés</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="./Register" variant="flat">
            Regisztráció
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
