import { MyNavbarMain } from '../../components'
import { Collapse } from 'bootstrap'
import React, { useEffect } from 'react'
import axios from 'axios'

// axios.post('http://localhost:8081/driver/', {
//   "user": {
//     "username": "hajnalmark",
//     "email": "noreply.trucksystem@gmail.com",
//     "password": "hashed_password"
//   },
//   "driver": {
//     "name": "hajnalmark",
//     "address": "samsongeci",
//     "phoneNumber": "0690 538 6459"
//   }
// })

export default function Records() {

  const [drivers, setDrivers] = React.useState([]);
  useEffect(() => {
    loadDrivers()
  }, []);

  const [freights, setFreights] = React.useState([]);
  useEffect(() => {
    loadFreights()
  }, []);

  const [trucks, setTrucks] = React.useState([]);
  useEffect(() => {
    loadTrucks()
  }, []);

  const loadFreights = async () => {
    const result = await axios.get('http://localhost:8081/freight/');
    setFreights(result.data)
    console.log(result.data)
  }

  const loadDrivers = async () => {
    const result = await axios.get('http://localhost:8081/driver/');
    setDrivers(result.data)
    console.log(result.data)
  }

  const loadTrucks = async () => {
    const result = await axios.get('http://localhost:8081/truck');
    setTrucks(result.data)
    console.log(result.data)
  }

  return (
    <div>
      <MyNavbarMain />

      <div class="container mt-4">
        <div class="accordion" id="accordionExample">
          <div class="accordion-item">
            <h2 className="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                Driver
              </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
              <div class="accordion-body">
                <table class="table table-striped table-bordered mt-4">
                  <thead className='table-primary'>
                    <tr>
                      <th scope="col">User ID</th>
                      <th scope="col">Driver ID</th>
                      <th scope="col">Address</th>
                      <th scope="col">Name</th>
                      <th scope="col">Phone Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    {drivers.map((driver, index) => (
                      <tr>
                        <th scope="row">{index}</th>
                        <td>{driver.driver.driverId}</td>
                        <td>{driver.driver.address}</td>
                        <td>{driver.driver.name}</td>
                        <td>{driver.driver.phoneNumber}</td>
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
            <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
              <div class="accordion-body">
                <div class="accordion-body">
                  <table class="table table-striped table-bordered mt-4">
                    <thead className='table-primary'>
                      <tr>
                        <th scope="col">Arrival Time</th>
                        <th scope="col">Driver ID</th>
                        <th scope="col">Freight ID</th>
                        <th scope="col">Start Time</th>
                        <th scope="col">Cargo</th>
                        <th scope="col">Destination</th>
                        <th scope="col">Origin</th>
                      </tr>
                    </thead>
                    <tbody>
                      {freights.map((freight, index) => (
                        <tr>
                          <td>{index}</td>
                          <td>{freight.arrivalTime}</td>
                          <td>{freight.driverId}</td>
                          <td>{freight.freightId}</td>
                          <td>{freight.startTime}</td>
                          <td>{freight.destination}</td>
                          <td>{freight.origin}</td>
                        </tr>
                      ))}

                    </tbody>
                  </table>
                </div>
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
                <div class="accordion-body">
                  <table class="table table-striped table-bordered mt-4">
                    <thead className='table-primary'>
                      <tr>
                        <th scope="col">Consumption AVG</th>
                        <th scope="col">Driver ID</th>
                        <th scope="col">Vehicle ID</th>
                        <th scope="col">Brand</th>
                        <th scope="col">Fuel Type</th>
                        <th scope="col">Plate Number</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trucks.map((truck, index) => (
                        <tr>                    
                          <td>{truck.averageConsumption}</td>
                          <td>{truck.driverId}</td>
                          <td>{truck.vehicleId}</td>
                          <td>{truck.brand}</td>
                          <td>{truck.fuelType}</td>
                          <td>{truck.plateNumber}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
