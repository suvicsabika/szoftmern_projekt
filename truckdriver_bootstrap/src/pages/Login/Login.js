import React, { useState } from 'react';
import { MyNavbarMain } from '../../components';

import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();

  const database = [
    {
      uname: "user1",
      pass: "pass1"
  },
  {
      uname: "user2",
      pass: "pass2"
  }
  ];

  const errors = {
    uname: "Helytelen felhasználónév",
    pass: "Helytelen jelszó"
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.target);
    const uname = data.get("uname");
    const pass = data.get("pass");

    const userUname = database.find((user) => user.uname === uname);
    const userPass = database.find((user) => user.pass === pass);
    const isValidPass = userPass && userPass.pass === pass;
    const isValidUname = userUname && userUname.uname === uname;

    if (!isValidPass) {
      setErrorMessages({
        name: "pass",
        message: errors.pass
      });
      return;
    }
    if (!isValidUname) {
      setErrorMessages({
        name: "uname",
        message: errors.uname
      });
      return;
    }
    localStorage.setItem("uname", uname);
    setErrorMessages({});
    setIsSubmitted(true);
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const renderForm = (
    <div className="container mt-4 pt-5">
      <div className="form d-flex justify-content-center pt-5">
        <form className="border border-info-subtle border-3 p-5" onSubmit={handleSubmit}>
          <h3 className="text-center pb-3">Bejelentkezés</h3>
          <div className="mb-3">
            <label >Felhasználónév</label>
            <input
              type="text"
              className="form-control"
              
              name="uname"
              placeholder="Felhasználónév"
              required
            />
            {renderErrorMessage("uname")}
          </div>
          <div className="mb-3">
            <label>Jelszó</label>
            <input
              type="password"
              className="form-control"
              placeholder="Jelszó"
              name="pass"
              required
            />
            {renderErrorMessage("pass")}
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Küldés
            </button>
          </div>
          <p className="forgot-password text-right mt-3">
            Nincs még fiókja? <Link to={"/Register"}>Regisztráljon egyet!</Link>
          </p>
        </form>
      </div>
    </div>
  );

  return (
    <div>
      <MyNavbarMain />
      <div className="app">
        <div className="login-form">
          {isSubmitted ? navigate("/") : renderForm}
        </div>
      </div>
    </div>
  );
}