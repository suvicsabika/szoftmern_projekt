import { MyNavbarMain } from '../../components'
import { Collapse } from 'bootstrap'
import { Link } from 'react-router-dom'
import React, { useEffect } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'
import { CSVLink } from "react-csv";

// axios.post('http://localhost:8081/driver/drivers', {
//   "user": {
//     "username": "cameron",
//     "email": "noreply.trucksystem@gmail.com",
//     "password": "hashed_password"
//   },
//   "drivers": {
//     "name": "Hajnal Szabolcs",
//     "address": "Kisvárda",
//     "phoneNumber": "0690 538 6459"
//   }
// })

export default function Records() {

  const [isTruckLengthZero, setIsTruckLengthZero] = React.useState(false); //import csv gombhoz kell
  const [isDriverLengthZero, setIsDriverLengthZero] = React.useState(false); //import csv gombhoz kell
  const [isFreightLengthZero, setIsFreightLengthZero] = React.useState(false); //import csv gombhoz kell
  const [isFormVisible, setIsFormVisible] = React.useState(false); //Az AddTruck gomb inputokhoz kell
  const [isNewFreightFormVisible, setIsNewFreightFormVisible] = React.useState(false); //Az AddFreight gomb inputokhoz kell

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

  const [newTruck, setNewTruck] = React.useState({
    averageConsumption: 0.0,
    driverId: 0,
    vehicleId: 0,
    brand: '',
    fuelType: '',
    plateNumber: '',
  });

  const [newFreight, setNewFreight] = React.useState({
    arrivalTime: Date(),
    driverId: 0,
    vehicleId: 0,
    startTime: Date(),
    cargo: '',
    destination: '',
    origin: '',
  });

  // -----------------------------USE EFFECTEK-------------------------------------------
  
  // ---------------------------- ADD TO DATABASE ---------------------------------------

  const handleAddTruck = async () => {
    try {
      console.log('Adding new truck:', newTruck);
  
      const response = await fetch('http://localhost:8081/truck', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTruck),
      });
  
      if (response.ok) {
        console.log('Truck added successfully');
      } else {
        console.error('Failed to add truck');
      }
  
      setNewTruck({
        averageConsumption: 0.0,
        driverId: 0,
        brand: '',
        fuelType: '',
        plateNumber: '',
      });
      setIsFormVisible(false);
    } catch (error) {
      console.error('Error adding truck:', error);
    }
    
    loadTrucks();
  };

  const handleAddFreight = async () => {
    try {

      const response = await fetch('http://localhost:8081/freight', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFreight),
      });

      if (response.ok) {
        console.log('Freight added successfully');

        setNewFreight({
          arrivalTime: Date(),
          driverId: 0,
          vehicleId: 0,
          startTime: Date(),
          cargo: '',
          destination: '',
          origin: '',
        });
      } else {
        console.error('Failed to add freight');
      }
    } catch (error) {
      console.error('Error adding freight:', error);
    }

    setIsNewFreightFormVisible(false);
    loadFreights();
  };

  // ---------------------------- ADD TO DATABASE --------------------------------

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

  /*const loadDrivers = async () => {
    const result = await axios.get('http://localhost:8081/driver/drivers');
    setDrivers(result.data)
    console.log(result.data)
    if (result.data.length === 0) {
      setIsDriverLengthZero(true);
      return 0;
    }
  }*/
  const loadDrivers = async () => {
    try {
      const driversResponse = await axios.get('http://localhost:8081/driver/drivers');
      const driversData = driversResponse.data;
  
      // Fetch user information for each driver to get the admin status
      const driversWithAdminStatus = await Promise.all(
        driversData.map(async (driver) => {
          const userResponse = await axios.get(`http://localhost:8081/driver/userid:${driver.driverId}`);
          const user = userResponse.data;
          return { ...driver, isAdmin: user.admin };
        })
      );
  
      setDrivers(driversWithAdminStatus);
  
      if (driversWithAdminStatus.length === 0) {
        setIsDriverLengthZero(true);
      }
    } catch (error) {
      console.error('Error loading drivers:', error);
    }
  };

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

  // ----------------------------- isAdmin setting ------------------------------------

    const fetchAdminStatus = async (userId) => {
      try {
        const response = await axios.get(`http://localhost:8081/driver/userid:${userId}`);
        console.log("USERID: " + userId);
        console.log("DATA:" + response.data);
        return response.data.admin;
      } catch (error) {
        console.error(`Error fetching admin status for user ${userId}:`, error);
        return false;
      }
    };

    const handleAdminCheckboxChange = async (driverId, userId) => {
      try {
        const isAdmin = await fetchAdminStatus(userId);
        console.log(`Admin status for user ${userId}:${isAdmin}`);
        axios.post(`http://localhost:8081/driver/isAdmin:${userId}-${!isAdmin}`);
      } catch (error) {
        console.error('Error handling admin status:', error);
      }
    };

  // ----------------------------- isAdmin setting ------------------------------------
  
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
                    {/*new*/}:
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
                          {/*<div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id={`isAdminCheckbox-${driver.driverId}`}
                              onChange={() => handleAdminCheckboxChange(driver.driverId, driver.driverId)}
                            />
                            <label className="form-check-label" htmlFor={`isAdminCheckbox-${driver.driverId}`}>
                              Admin
                            </label>
                           </div>*/}
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id={`isAdminCheckbox-${driver.driverId}`}
                              onChange={() => handleAdminCheckboxChange(driver.driverId, driver.driverId)}
                              checked={driver.isAdmin} // Set checked based on isAdmin property
                            />
                            <label className="form-check-label" htmlFor={`isAdminCheckbox-${driver.driverId}`}>
                              Admin
                            </label>
                          </div>
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
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => setIsNewFreightFormVisible(true)}
                >
                  Add Freight
                </button>

                {isNewFreightFormVisible && (
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Arrival Time"
                      value={newFreight.arrivalTime}
                      onChange={(e) =>
                        setNewFreight({ ...newFreight, arrivalTime: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Driver ID"
                      value={newFreight.driverId}
                      onChange={(e) =>
                        setNewFreight({ ...newFreight, driverId: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Freight ID"
                      value={newFreight.freightId}
                      onChange={(e) =>
                        setNewFreight({ ...newFreight, freightId: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Start Time"
                      value={newFreight.startTime}
                      onChange={(e) =>
                        setNewFreight({ ...newFreight, startTime: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Cargo"
                      value={newFreight.cargo}
                      onChange={(e) =>
                        setNewFreight({ ...newFreight, cargo: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Destination"
                      value={newFreight.destination}
                      onChange={(e) =>
                        setNewFreight({ ...newFreight, destination: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Origin"
                      value={newFreight.origin}
                      onChange={(e) =>
                        setNewFreight({ ...newFreight, origin: e.target.value })
                      }
                    />

                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleAddFreight}
                    >
                      Save
                    </button>
                  </div>
                )}
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
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => setIsFormVisible(true)}
                  >
                    Add Truck
                  </button>

                  {isFormVisible && (
                    <div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Average Consumption"
                        value={newTruck.averageConsumption}
                        onChange={(e) =>
                          setNewTruck({ ...newTruck, averageConsumption: e.target.value })
                        }
                      />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Driver ID"
                        value={newTruck.driverId}
                        onChange={(e) =>
                          setNewTruck({ ...newTruck, driverId: e.target.value })
                        }
                      />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Brand"
                        value={newTruck.brand}
                        onChange={(e) => setNewTruck({ ...newTruck, brand: e.target.value })}
                      />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Fuel Type"
                        value={newTruck.fuelType}
                        onChange={(e) =>
                          setNewTruck({ ...newTruck, fuelType: e.target.value })
                        }
                      />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Plate Number"
                        value={newTruck.plateNumber}
                        onChange={(e) =>
                          setNewTruck({ ...newTruck, plateNumber: e.target.value })
                        }
                      />

                      <button type="button" className="btn btn-primary" onClick={handleAddTruck}>
                        Save
                      </button>
                    </div>
                  )}
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
