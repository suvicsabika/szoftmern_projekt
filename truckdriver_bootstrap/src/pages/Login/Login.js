import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MyNavbarMain } from '../../components';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [users, setUsers] = React.useState([]);

  let dataArray = []
  useEffect(() => {
    loadUsers()
      // axios
      //   .get("http://localhost:8081/driver/")
      //   .then(res => {
      //     const newItem = {
      //       username: res.data.user.username,
      //       name: res.data.driver.name,
      //     };  
      //     dataArray.push(newItem);
      //   })
  }, []);

  const loadUsers = async () => {
    const result = await axios.get('http://localhost:8081/driver/users');
      
    setUsers(result.data)
    console.log(result.data)
  }

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
    },
    {
      uname: "admin",
      pass: "admin"
    }
  ];

  const errors = {
    pass: "Helytelen belépési adatok!"
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.target);
    const uname = data.get("uname");
    const pass = data.get("pass");
    //-------------------------------------------------------------------------------------------------------------//
    // const userName_database = users.find((user) => user.driver.name === uname);
    // const password_database = users.find((user) => user.user.username === pass);
    //-------------------------------------------------------------------------------------------------------------//

    console.log("uname: " + uname);
    console.log("pass: " + pass);
    //-------------------------------------------------------------------------------------------------------------//
    // console.log("userName_database: " + userName_database);               ADATBÁZISBÓL KERESÉS
    // console.log("password_database: " + password_database);
    // const isValidPass_database = password_database && password_database.driver.name === pass;
    // const isValidUname_database = userName_database && userName_database.user.username === uname;
    //-------------------------------------------------------------------------------------------------------------//

    const userUname = database.find((user) => user.pass === pass);
    const userPass = database.find((user) => user.pass === pass);

    const isValidPass = userPass && userPass.pass === pass;
    const isValidUname = userUname && userUname.uname === uname;

    if (!isValidPass || !isValidUname) {
      setErrorMessages({
        name: "pass",
        message: errors.pass
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
        <form className="border border-info-subtle border-3 p-5 shadow" onSubmit={handleSubmit}>
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
          {isSubmitted ? navigate("/records") : renderForm}
        </div>
      </div>
    </div>
  );
}