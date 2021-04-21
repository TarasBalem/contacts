import React, {useContext} from "react";
import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";
import UserContext from "contexts/UserContext";

const Navigation = ({logout}) => {
  const {userAuth} = useContext(UserContext);

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
          {!!userAuth.id ? (
            <>
              <div className="nav-link disabled">{userAuth.email}</div>
              <span onClick={logout} className="nav-link">
                <i className="bi bi-box-arrow-left" /> Logout
              </span>
            </>
          ) : (
            <>
              <NavLink to="/login" className="nav-link">
                <i className="bi bi-person" /> Login
              </NavLink>
              <NavLink to="/signup" className="nav-link">
                <i className="bi bi-box-arrow-in-right" /> Signup
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

Navigation.propType = {
  isAuth: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

export default Navigation;
