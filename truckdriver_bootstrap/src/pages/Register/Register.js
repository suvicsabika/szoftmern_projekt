import React from 'react'
import { MyNavbarMain } from '../../components'
import { Link } from 'react-router-dom'

export default function Register() {
  return (
    <div>
      <MyNavbarMain />
      <div className="container mt-4 pt-5">
        <div className="form d-flex justify-content-center pt-5">
          <form className="border border-info-subtle border-3 p-5 shadow">
            <h3 className="text-center pb-3">Regisztráció</h3>
            <div className="mb-3">
              <label>Felhasználónév</label>
              <input
                type="text"
                className="form-control"
                name="uname"
                placeholder="Felhasználónév"
                required
              />
            </div>
            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="uname"
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
                name="pass"
                required
              />

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
    </div>
  )
}
