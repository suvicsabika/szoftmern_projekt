import React from "react";

import { NextUIProvider } from "@nextui-org/react";
import MyNavbar from "../../components/MyNavbar";

export default function Home() {
    return (
        <NextUIProvider>
            <MyNavbar />
            <h1>anyátokat azt</h1>
        </NextUIProvider>
    )
}