import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function MyNavbar() {
    const auth = localStorage.getItem("uname")
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/');
    }

    console.log(localStorage)
    return (
        <div>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/">Szoft. Mérn. Projekt</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item top-0">
                                <Link class="nav-link active" aria-current="page" to={"/about"}>Munkaterv</Link>
                            </li>
                        </ul>
                        {
                            auth ?
                                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                        <li class="nav-item top-0">
                                            <Link class="nav-link active" aria-current="page" to={"/records"}>Nyilvántartás - {localStorage.getItem("uname")}</Link>
                                        </li>
                                        {auth == "admin" && (
                                        <>
                                        <li class="nav-item top-0">
                                            <Link class="nav-link active" aria-current="page" to={"/recordsuser"}>Nyilvántartás - nemAdmin</Link>
                                        </li>
                                        <li class="nav-item top-0">
                                            <Link class="nav-link active" aria-current="page" to={"/adddriver"}>Add Driver</Link>
                                        </li>
                                        </>)}
                                        <li class="nav-item top-0">
                                            <Link class="nav-link active" aria-current="page" to={"/email"}>Send an email</Link>
                                        </li>
                                        
                                    </ul>
                                    <h className="pe-3">Üdvözöllek, {auth}</h>
                                    <form class="d-flex">
                                        <Link class="btn btn-primary me-2" type="submit" onClick={logout} to={"/home"}>Kijelentkezés</Link>
                                    </form>
                                </div>
                                :
                                <div>
                                    <form class="d-flex">
                                        <Link class="btn btn-primary me-2" type="login" to={"/Login"}>Bejelentkezés</Link>
                                        <Link class="btn btn-outline-success" type="register" to={"/Register"}>Regisztráció</Link>
                                    </form>
                                </div>
                        }

                    </div>
                </div>
            </nav>
        </div>
    )
}
