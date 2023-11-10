import React from "react";

import { NextUIProvider } from "@nextui-org/react";
import MyNavbar from "../../components/MyNavbar";

import "./Records.css";

export default function Records() {
    return (
        <NextUIProvider>
            <MyNavbar />
            <h1>Records</h1>
        </NextUIProvider>
    )
};