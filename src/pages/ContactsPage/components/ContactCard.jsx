import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

const ContactCard = ({selectedContact}) => {
  const {name, email, phone, photo} = selectedContact;
  return (
    <div className="row card mb-3">
      <div className="row g-0">
        <Link
          to="/contacts"
          type="button"
          className="btn-close position-absolute top-0 end-0"
        ></Link>
        <div className="col-md-4">
          <img src={photo} alt={name} style={{maxWidth: "100%"}} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>Phone</td>
                  <td>{phone}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{email}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

ContactCard.propTypes = {
  selectedContact: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    photo: PropTypes.string,
  }).isRequired,
};

ContactCard.defaultProps = {
  selectedContact: {},
};

export default ContactCard;
