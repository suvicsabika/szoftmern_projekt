import React from 'react'
import { MyNavbarMain } from '.'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EditPerson() {
  const [driver, setDriver] = React.useState({
    name: '',
    address: '',
    phoneNumber: ''
  });

  const onInputChange = (e) => {
    setDriver({ ...driver, [e.target.id]: e.target.value })
  };

  let navigate = useNavigate();

  return (
    <div>
      <MyNavbarMain />
      <div className='container mt-4 pt-5 d-flex justify-content-center'>
        <form 
            className='border border-info-subtle border-3 p-5 shadow'
            onSubmit={async (e) => {
              e.preventDefault();
              await axios.post("http://localhost:8081/driver/", driver);
              navigate('/records');
            }}>
          <h1 className='text-center'>Add Driver</h1>
          <div class="mb-3">
            <label for="exampleInputEmail1" className="form-label">Name</label>
            <input type="username" className="form-control" 
                id="name" 
                value={driver.name}
                onChange={(e) => onInputChange(e)} />
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Address</label>
            <input type="address" className="form-control" 
                id="address"
                value={driver.address}
                onChange={(e) => onInputChange(e)} />
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Phone Number</label>
            <input type="phoneNumber" className="form-control" id="phoneNumber" />
          </div>          
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  )
};
