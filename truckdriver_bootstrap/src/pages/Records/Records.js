import React from 'react'
import { MyNavbarMain } from '../../components'
import { Collapse } from 'bootstrap'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Records() {

  const [drivers, setDrivers] = useState([]);
  useEffect(() => {
    loadDrivers()
  }, []);

  const loadDrivers = async () => {
    const result = await axios.get('http://127.0.0.1:8081/driver');
    setDrivers(result.data)
    console.log(result.data)
  }

  return (
    <div>
      <MyNavbarMain />

      <div class="container mt-4">
        <div class="accordion" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                Driver
              </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
              <div class="accordion-body">
                <table class="table table-striped table-bordered mt-4">
                  <thead className='table-primary'>
                    <tr>
                      <th scope="col">Driver ID</th>
                      <th scope="col">User ID</th>
                      <th scope="col">Address</th>
                      <th scope="col">Name</th>
                      <th scope="col">Phone Number</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                  {drivers.map((driver, index) => (
                    <tr>
                      <th scope="row">{driver.driver_id}</th>
                      <td>{driver.user_id}</td>
                      <td>{driver.address}</td>
                      <td>{driver.name}</td>
                      <td>{driver.phone_number}</td>
                    </tr>
                  ))}
                    
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                Freight
              </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse" data-bs-parent="#accordionExample">
              <div class="accordion-body">
                <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                Truck
              </button>
            </h2>
            <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
              <div class="accordion-body">
                <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}
