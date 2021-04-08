import React from "react";
import {NavLink} from "react-router-dom";

const Navigation = () => {
  return (
    <div className="row pb-3">
      <nav className="nav">
        <NavLink to="/" exact className="nav-link">
          <i className="bi bi-house" /> Home
        </NavLink>
        <NavLink to="/contacts" className="nav-link">
          <i className="bi bi-people" /> Contacts
        </NavLink>
      </nav>
    </div>
  );
};

export default Navigation;
