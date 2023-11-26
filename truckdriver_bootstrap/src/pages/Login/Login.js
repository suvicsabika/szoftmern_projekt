import React, { useState } from 'react';
import axios from 'axios';
import { MyNavbarMain } from '../../components';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8081/driver/login/', {
        "username": username,
        "password": password,
      });
      console.log(response);
      if (response.status === 200) {
        setSuccess(true);
        setError(null);
        localStorage.setItem("uname", username);
      } else {
        setSuccess(false);
        setError('Belépés sikertelen. Ellenőrizze az adatokat!');
      }
    } catch (error) {
      console.error('Login failed:', error.response.data);
      setSuccess(false);
      setError('Belépés sikertelen. Ellenőrizze az adatokat!');
    }
  };

  const renderForm = (
    <div className="container mt-4 pt-5">
      <div className="form d-flex justify-content-center pt-5">
        <form className="border border-info-subtle border-3 p-5 shadow" onSubmit={handleLogin}>
          <h3 className="text-center pb-3">Bejelentkezés</h3>
          <div className="mb-3">
            <label >Felhasználónév</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div style={{ color: 'red' }}>{error}</div>}
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
          {success ? navigate("/records") : renderForm}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
