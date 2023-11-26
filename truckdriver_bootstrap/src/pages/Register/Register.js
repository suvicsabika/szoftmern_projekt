import React from 'react'
import { MyNavbarMain } from '../../components'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Register() {
  // const [errorMessages, setErrorMessages] = React.useState({}); // ez a hook az errorokat tárolja
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  // const errors = {   
  //   error: "Helytelen forátumú adatokat adtál meg!"                      
  // };

  // const renderErrorMessage = (field) => {
  //   if (errors[field]) {
  //     return <div className="alert alert-danger">{errors[field]}</div>;
  //   }
  // }

  const handleSubmit = (event) => {

    event.preventDefault();

    const data = new FormData(event.target);
    const username = data.get("username");
    const email = data.get("email");
    const password = data.get("password");
    // console.log(username);
    // console.log(email);
    // console.log(password);

    axios.post('http://localhost:8081/driver/register', {
      "user": {
        "username": username,
        "email": email,
        "password": password
      },
      "driver": {
        "name": "Hajnal Szabolcs",
        "address": "Kisvárda",
        "phoneNumber": "0690 538 6459"
      }
    })
    // setErrorMessages({});
    setIsSubmitted(true);
  };

  const renderForm = (
    <div className="container mt-4 pt-5">
      <div className="form d-flex justify-content-center pt-5">
        <form className="border border-info-subtle border-3 p-5 shadow" onSubmit={handleSubmit}>
          <h3 className="text-center pb-3">Regisztráció</h3>
          <div className="mb-3">
            <label>Felhasználónév</label>
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Felhasználónév"
              required
            />
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email"
              required
            />
          </div>

          <div className="mb-3">
            <label>Jelszó</label>
            <input
              type="password"
              className="form-control"
              placeholder="Jelszó"
              name="password"
              required
            />
            {/* {renderErrorMessage("error")}             egyelőre nem kell errort renderelni*/}
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Küldés
            </button>
          </div>
          <p className="forgot-password text-right mt-3">
            Már van fiókja? <Link to={"/Login"}>Lépjen be ide kattintva!</Link>
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
          {isSubmitted ?
            <div className='container mt-2 pt-2 d-flex justify-content-center'>
              <form className='border border-info-subtle border-3 p-4 shadow text-center' >
                <h5>Sikeres regisztráció!</h5><br />
                <h5><Link to={"/Login"}>A belépéshez kattintson ide!</Link></h5>
              </form>
            </div>
            : renderForm}
        </div>
      </div>
    </div>
  )
}
