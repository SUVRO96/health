import React, { useState } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="container">
      <h1>You are looking for:</h1>
      <div>
        <Link to="/doctors" className="btn btn-outline-secondary m-1">
          Doctors
        </Link>
        <Link to="/services" className="btn btn-outline-secondary m-1">
          Services
        </Link>
        <Link to="/appolist" className="btn btn-outline-secondary m-1">
          Appointments
        </Link>
      </div>
    </div>
  );
};

export default Nav;
