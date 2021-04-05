import React from "react";
import PropTypes from "prop-types";
import ContactItem from "pages/ContactsPage/components/ContactItem";

const ContactsList = ({contacts}) => {
  return (
    <div className="list-group">
      {contacts.map((contact) => (
        <ContactItem contact={contact} key={contact.id} />
      ))}
    </div>
  );
};

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

ContactsList.defaultProps = {
  contacts: [],
};

export default ContactsList;
