import React from "react";

import { NextUIProvider } from "@nextui-org/react";
import MyNavbar from "../../components/MyNavbar";

export default function Login() {
    return (
        <NextUIProvider>
            <MyNavbar />
            <h1>Login</h1>
        </NextUIProvider>
    )
}