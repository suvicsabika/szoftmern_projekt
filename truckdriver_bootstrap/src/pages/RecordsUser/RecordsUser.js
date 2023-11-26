import { MyNavbarMain } from '../../components'
import { Collapse } from 'bootstrap'
import { Link } from 'react-router-dom'
import React, { useEffect } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'
import { CSVLink } from "react-csv";

export default function Records() {

  const [isTruckLengthZero, setIsTruckLengthZero] = React.useState(false); //import csv gombhoz kell
  const [isDriverLengthZero, setIsDriverLengthZero] = React.useState(false); //import csv gombhoz kell
  const [isFreightLengthZero, setIsFreightLengthZero] = React.useState(false); //import csv gombhoz kell

  // -----------------------------USE EFFECTEK-------------------------------------------
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
  // -----------------------------USE EFFECTEK-------------------------------------------


  // -----------------------------LOAD FÜGGVÉNYEK-------------------------------------------  
  const loadFreights = async () => {
    const result = await axios.get('http://localhost:8081/freight/');
    setFreights(result.data)
    console.log(result.data)
    if (result.data.length === 0) {
      setIsFreightLengthZero(true);
      return 0;
    }
  }

  const loadDrivers = async () => {
    const result = await axios.get('http://localhost:8081/driver/drivers');
    setDrivers(result.data)
    console.log(result.data)
    if (result.data.length === 0) {
      setIsDriverLengthZero(true);
      return 0;
    }
  }

  const loadTrucks = async () => {
    const result = await axios.get('http://localhost:8081/truck');
    setTrucks(result.data)
    console.log(result.data)
    if (result.data.length === 0) {
      setIsTruckLengthZero(true);
      return 0;
    }
  }
  // -----------------------------LOAD FÜGGVÉNYEK------------------------------------------- 
  
  // -----------------------------DELETE FÜGGVÉNYEK---------------------------------------
  const deleteDriver = async (id) => {
    await axios.delete(`http://localhost:8081/driver/${id}`);
    loadDrivers();
  }

  const deleteFreight = async (id) => {
    await axios.delete(`http://localhost:8081/freight/${id}`);
    loadFreights();
  }

  const deleteTruck = async (id) => {
    await axios.delete(`http://localhost:8081/truck/${id}`);
    loadTrucks();
  }
  // -----------------------------DELETE FÜGGVÉNYEK---------------------------------------

  // -----------------------------TIME FORMAT FÜGGVÉNYEK---------------------------------------
  const arrivalTimeFormat = freights.map((freight) => {              //FREIGHTS.ARRIVALTIME FORMATJA
    return dayjs(freight.arrivalTime).format("YYYY-MM-DD");
  })
  console.log("arrival: " + arrivalTimeFormat); 

  
  const startTimeFormat = freights.map((freight) => {              //FREIGHTS.startTime FORMATJA
    return dayjs(freight.startTime).format("YYYY-MM-DD");
  })
  console.log("arrival: " + startTimeFormat); 
  // -----------------------------TIME FORMAT FÜGGVÉNYEK---------------------------------------
  
  return (
    <div>
      <MyNavbarMain />
      <div class="container mt-4">
        <div class="accordion" id="accordionExample">
          <div class="accordion-item">
            <h2 className="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                Driver - {localStorage.getItem("uname")}
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
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {drivers.map((driver, index) => (
                      <tr>
                        <th scope="row">{index}</th>
                        <td>{driver.driverId}</td>
                        <td>{driver.address}</td>
                        <td>{driver.name}</td>
                        <td>{driver.phoneNumber}</td>
                        <td>
                          <Link to={`/Editdriver/${driver.driverId}`} type="button" class="btn btn-primary me-2">Edit</Link>
                          <button type="button" class="btn btn-danger" onClick={() => deleteDriver(driver.driverId)}>Delete</button>
                        </td>
                      </tr>
                    ))}

                  </tbody>
                </table>
                {isDriverLengthZero ? <div></div> : <CSVLink data={drivers} className='btn btn-success csv-button'>Import to .csv</CSVLink>}
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                Freight - {localStorage.getItem("uname")}
              </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
              <div class="accordion-body">
                <div class="accordion-body">
                  <table class="table table-striped table-bordered mt-4">
                    <thead className='table-primary'>
                      <tr>
                        <th scope="col">Index</th>
                        <th scope="col">Arrival Time</th>
                        <th scope="col">Driver ID</th>
                        <th scope="col">Freight ID</th>
                        <th scope="col">Start Time</th>
                        <th scope="col">Cargo</th>
                        <th scope="col">Destination</th>
                        <th scope="col">Origin</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {freights.map((freight, index) => (
                        <tr>
                          <td>{index}</td>
                          <td>{arrivalTimeFormat[index]}</td>
                          <td>{freight.driverId}</td>
                          <td>{freight.freightId}</td>
                          <td>{startTimeFormat[index]}</td>
                          <td>{freight.cargo}</td>
                          <td>{freight.destination}</td>
                          <td>{freight.origin}</td>
                          <td>
                            <button type="button" class="btn btn-danger ms-1" onClick={() => deleteFreight(freight.freightId)}>Delete</button>
                          </td>
                        </tr>
                      ))}                      
                    </tbody>
                  </table>
                  {isFreightLengthZero ? <div></div> : <CSVLink data={freights} className='btn btn-success csv-button'>Import to .csv</CSVLink>}
                </div>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                Truck - {localStorage.getItem("uname")}
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
                        <th scope="col"></th>
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
                          <td>
                            <button type="button" className="btn btn-danger ms-2" onClick={() => deleteTruck(truck.vehicleId)}>Delete</button>
                        </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {isTruckLengthZero ? <div></div> : <CSVLink data={trucks} className='btn btn-success csv-button'>Import to .csv</CSVLink>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
