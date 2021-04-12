import React, {memo, useContext} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import ContactContext from "contexts/ContactContext";

const ContactItem = ({contact}) => {
  const {deleteContact} = useContext(ContactContext);

  return (
    <div className="list-group-item row d-flex">
      <Link to={`/contacts/contact/${contact.id}`} className="col-10">
        {contact.name}
      </Link>
      <div className="col-2 d-flex justify-content-end">
        <Link
          to={`/contacts/edit/${contact.id}`}
          className="btn btn-secondary me-3"
        >
          <i className="bi bi-pencil" />
        </Link>
        <button
          className="btn btn-danger"
          onClick={() => deleteContact(contact)}
        >
          <i className="bi bi-trash" />
        </button>
      </div>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
};

ContactItem.defaultProp = {
  contact: {},
};

export default memo(ContactItem);
