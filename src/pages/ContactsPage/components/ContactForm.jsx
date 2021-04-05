import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";

const ContactForm = ({saveContact, selectedContact}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (selectedContact.id) {
      setFormData(selectedContact);
    }
  }, [selectedContact]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveContact(formData);
    setFormData({name: "", email: ""});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container position-relative py-3"
      style={{maxWidth: "500px"}}
    >
      <button
        type="button"
        className="btn-close position-absolute top-0 end-0"
      ></button>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          type="text"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="text"
          className="form-control"
        />
      </div>
      <button className="btn btn-primary">Done</button>
    </form>
  );
};

ContactForm.propTypes = {
  saveContact: PropTypes.func.isRequired,
  selectedContact: PropTypes.object,
};

export default ContactForm;
