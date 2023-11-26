import React from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { Register, Login, About, Records, RecordsUser, Email } from './pages';
import { EditDriver, AddDriver } from './components';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<About />} />
          <Route path="/home" element={<About />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/About" element={<About />} />
          <Route path="/Records" element={<Records />} />
          <Route path="/RecordsUser" element={<RecordsUser />} />
          <Route path="/Adddriver" element={<AddDriver />} />
          <Route path="/Email" element={<Email />} />
          <Route exact path="/Editdriver/:id" element={<EditDriver />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
};
