import React from 'react'
import { MyNavbarMain } from '../../components'

export default function About() {
  return (
    <div>
      <MyNavbarMain />
      <div class="card p-4 m-5">
        <div class="card-body">
          <h5 class="card-title">Szoft. Mérn. Projekt</h5>
          <p class="card-text">Ez a projekt a Szoftverfejlesztés Mérnököknek című tárgy keretein belül készült.</p>
          <p class="card-text">A projektet egy 4 fős csapat alkotta, melynek tagjai:</p>

          <ul class="list-group list-group-flush ">
            <li class="list-group-item">Hajnal Szabolcs</li>
            <li class="list-group-item">Süvöltős Csaba</li>
            <li class="list-group-item">Kormány Gábor</li>
            <li class="list-group-item">Bahor Máté</li>
          </ul>

          <h5 class="mt-5">Felhasznált eszközök</h5>
          <p class="card-text">A webalkalmazásunk megvalósításhoz többféle eszközt is alkalmaztunk, melynek a célja a saját munkánk megkönnyítése illetve a tanulás volt.</p>
          <h5 class="mt-3 fw-bold ps-1">Backend:</h5>
          <p class="card-text ps-1">Backend-en egy <h class="fw-bold">SpringBoot</h> alkalmazást építettünk fel, amely egy <h class="fw-bold">H2 adatbázisban</h> tárolja adatainkat, amelyhez a hozzáférést a <h class="fw-bold">JDBC API</h> biztosítja számunkra. Az egymás közötti kommunikáció erre épül.</p>

          <h5 class="mt-3 fw-bold ps-1">Frontend:</h5>
          <p class="card-text ps-1">A webalkalmazás frontend része leginkább a <h class="fw-bold">React</h>-ra épül fel. A megjelenés a <h class="fw-bold">Bootstrap 5</h>-nek köszönhető.</p>
        </div>
      </div>
    </div>
  )
}
