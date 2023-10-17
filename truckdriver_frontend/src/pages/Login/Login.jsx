import React, { useState } from "react";

import "./Login.css";
import { NextUIProvider /*Input*/  } from "@nextui-org/react";
import MyNavbar from "../../components/MyNavbar";


/*import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";}*/

export default function Login() {
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    // User Login info
    const database = [
        {
            username: "user1",
            password: "pass1"
        },
        {
            username: "user2",
            password: "pass2"
        }
    ];

    const errors = {
        uname: "Helytelen felhasználónév",
        pass: "Helytelen jelszó"
    };

    const handleSubmit = (event) => {
        // Prevent page reload
        event.preventDefault();

        var { uname, pass } = document.forms[0];

        // Find user login info
        const userData = database.find((user) => user.username === uname.value);

        // Compare user info
        if (userData) {
            if (userData.password !== pass.value) {
                // Invalid password
                setErrorMessages({ name: "pass", message: errors.pass });
            } else {
                setIsSubmitted(true);
            }
        } else {
            // Username not found
            setErrorMessages({ name: "uname", message: errors.uname });
        }
    };

    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );


    /*const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);*/ //masik login formhoz

    // JSX code for login form
    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Felhasználónév </label>
                    <input type="text" name="uname" required />
                    {renderErrorMessage("uname")}
                </div>
                <div className="input-container">
                    <label >Jelszó </label>

                    {/*<Input 
                        label="Jelszó"
                        variant="bordered"
                        placeholder="Add meg a jelszavad"
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                {isVisible ? (
                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        }
                        type={isVisible ? "text" : "password"}
                        className="max-w-xs"
                    /> {/*lehetseges hogy ez lesz*/}
                    
                    <input type="password" name="pass" required />
                    {renderErrorMessage("pass")}
                </div>
                <div className="button-container">
                    <input type="submit" />
                </div>
                <div className="register">
                    <a href="/Register">Nincs még fiókja? Regisztráljon egyet.</a>
                </div>
            </form>
        </div>
    );

    return (
        <NextUIProvider>
            <MyNavbar />
            <div className="app">
                <div className="login-form">
                    <div className="title">Bejelentkezés</div>
                    {isSubmitted ? <div className="isSubmitted">Sikeres bejelentkezés</div> : renderForm}
                </div>
            </div>
        </NextUIProvider>
    );
}