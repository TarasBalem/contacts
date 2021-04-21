import React, {useState} from "react";
import PropTypes from "prop-types";
import isEmail from "validator/es/lib/isEmail";
import equals from "validator/es/lib/equals";
import FormMessage from "components/FormMessage";

const SignupForm = ({createUser}) => {
  const [signupForm, setSignupForm] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setSignupForm({...signupForm, [e.target.name]: e.target.value});
    setErrors({...errors, [e.target.name]: ""});
  };

  const validate = (data) => {
    const errors = {};
    if (!isEmail(data.email)) errors.email = "Wrong email";
    if (!data.password) errors.password = "Password cannot be blank";
    if (!equals(data.password, data.passwordConfirmation))
      errors.password = "Password is not equals to password confirmation";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(signupForm);
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      createUser(signupForm.email, signupForm.password);
      setSignupForm({email: "", password: "", passwordConfirmation: ""});
    }
  };

  const {email, password, passwordConfirmation} = signupForm;

  return (
    <form onSubmit={handleSubmit} className="col-4 mx-auto">
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          id="email"
          name="email"
          value={email}
          onChange={handleChange}
          type="email"
          className={`form-control ${errors.email ? "is-invalid" : ""}`}
        />
        {errors.email && <FormMessage>{errors.email}</FormMessage>}
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          id="password"
          name="password"
          value={password}
          onChange={handleChange}
          type="password"
          className={`form-control ${errors.password ? "is-invalid" : ""}`}
        />
        {errors.password && <FormMessage>{errors.password}</FormMessage>}
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password confrimation
        </label>
        <input
          id="passwordConfirmation"
          name="passwordConfirmation"
          value={passwordConfirmation}
          onChange={handleChange}
          type="password"
          className={`form-control ${
            errors.passwordConfirmation ? "is-invalid" : ""
          }`}
        />
        {errors.passwordConfirmation && (
          <FormMessage>{errors.passwordConfirmation}</FormMessage>
        )}
      </div>
      <button type="submit" className="btn btn-primary">
        Signup
      </button>
    </form>
  );
};

SignupForm.propTypes = {
  createUser: PropTypes.func.isRequired,
};

export default SignupForm;
