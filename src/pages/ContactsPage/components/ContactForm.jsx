import React, {useState, useEffect, useRef} from "react";
import PropTypes from "prop-types";
import ImageLoader from "components/ImageLoader";
import FormMessage from "components/FormMessage";

const ContactForm = ({saveContact, selectedContact, closeForm}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    photo: "",
  });
  const [errors, setErrors] = useState({});

  const photoRef = useRef();

  const updatePhoto = (e) => {
    const file = photoRef.current.files && photoRef.current.files[0];
    if (file) {
      const img = "/img/" + file.name;
      setFormData({...formData, photo: img});
    }
  };

  useEffect(() => {
    if (selectedContact.id) {
      setFormData(selectedContact);
    }
  }, [selectedContact]);

  const validate = (data) => {
    const errors = {};
    if (!data.name) errors.name = "Name cannot be blank";
    if (!data.email) errors.email = "Email cannot be blank";
    if (!data.phone) errors.phone = "Phone cannot be blank";
    return errors;
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
    setErrors({...errors, [e.target.name]: ""});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formData);
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      saveContact(formData);
      setFormData({name: "", email: "", phone: "", photo: ""});
      closeForm();
    }
  };

  const {name, email, phone, photo} = formData;

  return (
    <form onSubmit={handleSubmit} className="position-relative py-3">
      <button
        type="button"
        className="btn-close position-absolute top-0 end-0"
        onClick={closeForm}
      ></button>
      <div className="row">
        <div className="col-4 d-flex align-items-center justify-content-center">
          <ImageLoader
            src={photo}
            alt={name}
            fallbackImg="/img/default-avatar.jpg"
            style={{width: "100%", height: "100%", objectFit: "cover"}}
          />
        </div>
        <div className="col-8">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              id="name"
              name="name"
              value={name}
              onChange={handleChange}
              type="text"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
            />
            {errors.name && <FormMessage>{errors.name}</FormMessage>}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              type="text"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
            />
            {errors.email && <FormMessage>{errors.email}</FormMessage>}
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              value={phone}
              onChange={handleChange}
              type="text"
              className={`form-control ${errors.phone ? "is-invalid" : ""}`}
            />
            {errors.phone && <FormMessage>{errors.phone}</FormMessage>}
          </div>
          <div className="mb-3">
            <label htmlFor="photo" className="form-label">
              Photo
            </label>
            <input
              id="photo"
              name="photo"
              ref={photoRef}
              onChange={updatePhoto}
              className="form-control"
              type="file"
            />
          </div>
          <button className="btn btn-primary">Done</button>
        </div>
      </div>
    </form>
  );
};

ContactForm.propTypes = {
  saveContact: PropTypes.func.isRequired,
  selectedContact: PropTypes.object,
};

export default ContactForm;
