import React, { useEffect } from 'react'
import { MyNavbarMain } from '.'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function EditDriver() {
  const params = useParams(); // ez a hook kiszedi az id-t a linkből (ez arra kell, hogy tudjuk melyiket editelem és használjam a put-ot)

  const [drivers, setDrivers] = React.useState([]);
  useEffect(() => {
    loadDrivers()
  }, []);

  const loadDrivers = async () => {
    const result = await axios.get('http://localhost:8081/driver/drivers');
    if (result.data.length === 0) {
      return;
    }
    setDrivers(result.data)
    console.log(result.data)
  }

  let currentDriverName = "";
  let currentDriverAddress = "";
  let currentDriverPhoneNumber = "";

  drivers.map((driver) => {
    if (driver.driverId === parseInt(params.id)) { //kiszedi a jelenlegi driver nevét az url id alapján
      //console.log(driver.name)
      currentDriverName += driver.name;
      currentDriverAddress += driver.address;
      currentDriverPhoneNumber += driver.phoneNumber;
    } else {
      console.log("valami nem jo teso ")
    }
  })

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.target);
    const name = data.get("name");
    const address = data.get("address");
    const phoneNumber = data.get("phoneNumber");
    console.log(name);
    console.log(address);
    console.log(phoneNumber);

    axios.put(`http://localhost:8081/driver/${params.id}`, { // a mapping még nem jó
      "name": name,
      "address": address,
      "phoneNumber": phoneNumber
    })
  };


  return (
    <div>
      <MyNavbarMain />
      <div className='container mt-4 pt-5 d-flex justify-content-center'>
        <form
          className='border border-info-subtle border-3 p-5 shadow' onSubmit={handleSubmit}>
          <h1 className='text-center'>Edit Driver</h1>
          <h5 className='text-center pt-2 pb-2'>You are currently editing {currentDriverName}!</h5>
          <h6 className='text-center pt-1 pb-1'>Please enter the new data!</h6>
          <div class="mb-3">
            <label for="exampleInputEmail1" className="form-label">Name</label>
            <input type="username" className="form-control"
              name="name"
              placeholder={currentDriverName}
              id="name"
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Address</label>
            <input type="address" className="form-control"
              name="address"
              placeholder={currentDriverAddress}
              id="address"
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Phone Number</label>
            <input type="phoneNumber" className="form-control"
              name="phoneNumber"
              placeholder={currentDriverPhoneNumber}
              id="phoneNumber" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  )
}
