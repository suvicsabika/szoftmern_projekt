import React from 'react'
import { MyNavbarMain } from '.'
import axios from 'axios';

export default function EditPerson() {
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.target);
    const name = data.get("name");
    const address = data.get("address");
    const phoneNumber = data.get("phoneNumber");
    console.log(name);
    console.log(address);
    console.log(phoneNumber);

    axios.post('http://localhost:8081/driver/register', {
      "user": {
        "username": "sample",
        "email": "sample@gmail.com",
        "password": "password"
      },
      "driver": {
        "name": name,
        "address": address,
        "phoneNumber": phoneNumber
      }
    })
    setIsSubmitted(true);
  };

  const renderForm = (
    <div className='container mt-4 pt-5 d-flex justify-content-center'>
        <form 
            className='border border-info-subtle border-3 p-5 shadow' onSubmit={handleSubmit} >
          <h1 className='text-center'>Add Driver</h1>
          <div class="mb-3">
            <label for="exampleInputEmail1" className="form-label">Name</label>
            <input type="username" className="form-control" 
                id="name" 
                name="name" />
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Address</label>
            <input type="address" className="form-control" 
                id="address"
                name="address" />
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Phone Number</label>
            <input type="phoneNumber" className="form-control"
              id="phoneNumber"
              name="phoneNumber" />
          </div>          
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
  );

  return (
    <div>
      <MyNavbarMain />
      {isSubmitted ? 
      <div>
        {renderForm} 
        <div className='container mt-2 pt-2 d-flex justify-content-center'>
          <form className='border border-info-subtle border-3 p-4 shadow' >
            Sikeresen hozzáadott egy új sofőrt!
          </form>
        </div> 
      </div>
        : renderForm}
    </div>
  )
};
