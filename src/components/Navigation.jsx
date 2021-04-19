import React from "react";
import {NavLink} from "react-router-dom";

const Navigation = () => {
  return (
    <div className="row pb-3">
      <nav className="nav d-flex bd-highlight pe-0">
        <NavLink to="/" exact className="nav-link bd-highlight">
          <i className="bi bi-house" /> Home
        </NavLink>
        <NavLink to="/contacts" className="nav-link bd-highlight">
          <i className="bi bi-people" /> Contacts
        </NavLink>
        <div className="ms-auto bd-highlight d-flex">
          <NavLink to="/login" className="nav-link ">
            <i className="bi bi-box-arrow-in-right" /> Login
          </NavLink>
          <NavLink to="/signup" className="nav-link ">
            <i className="bi bi-box-arrow-in-right" /> Signup
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
