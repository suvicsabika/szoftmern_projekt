import React from "react";

import { NextUIProvider } from "@nextui-org/react";
import MyNavbar from "../../components/MyNavbar";

import "./Home.css";

export default function Home() {
    return (
        <NextUIProvider>
            <MyNavbar />
        </NextUIProvider>
    )
}