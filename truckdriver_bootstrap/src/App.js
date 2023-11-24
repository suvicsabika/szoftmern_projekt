import React from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { Home, Register, Login, About, Records } from './pages';
import { EditPerson, AddDriver } from './components';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/About" element={<About />} />
          <Route path="/Records" element={<Records />} />
          <Route path="/Adddriver" element={<AddDriver />} />
          <Route exact path="/Editperson/:id" element={<EditPerson />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
};
