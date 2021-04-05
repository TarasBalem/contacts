import React, {memo, useContext} from "react";
import PropTypes from "prop-types";
import ContactContext from "contexts/ContactContext";

const ContactItem = ({contact}) => {
  const {deleteContact, selectContactForEdit} = useContext(ContactContext);

  return (
    <div className="list-group-item row d-flex">
      <div className="col-10">{contact.name}</div>
      <div className="col-2 d-flex justify-content-end">
        <button
          className="btn btn-secondary me-3"
          onClick={() => selectContactForEdit(contact)}
        >
          <i className="bi bi-pencil" />
        </button>
        <button
          className="btn btn-danger"
          onClick={() => deleteContact(contact.id)}
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
