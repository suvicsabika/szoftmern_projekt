import React from "react";

import { NextUIProvider } from "@nextui-org/react";
import MyNavbar from "../../components/MyNavbar";

export default function Register() {
    return (
        <NextUIProvider>
            <MyNavbar />
            <h1>Register</h1>
        </NextUIProvider>
    )
}