import React, {useState} from "react";
import PropTypes from "prop-types";
import isEmail from "validator/es/lib/isEmail";
import FormMessage from "components/FormMessage";

const LoginForm = ({loginUser}) => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setLoginForm({...loginForm, [e.target.name]: e.target.value});
    setErrors({...errors, [e.target.name]: ""});
  };

  const validate = (data) => {
    const errors = {};
    if (!isEmail(data.email)) errors.email = "Wrong email";
    if (!data.password) errors.password = "Password cannot be blank";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(loginForm);
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      loginUser(loginForm.email, loginForm.password);
      setLoginForm({email: "", password: ""});
    }
  };

  const {email, password} = loginForm;

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
      <button type="submit" className="btn btn-primary">
        Signup
      </button>
    </form>
  );
};

LoginForm.propType = {
  loginUser: PropTypes.func.isRequire,
};

export default LoginForm;
