import React, {useState} from "react";

const SignupForm = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const handleChange = (e) => {
    setLoginForm({...loginForm, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(loginForm);
  };
  return (
    <form className="col-4 mx-auto" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          id="email"
          name="email"
          onChange={handleChange}
          type="email"
          className="form-control"
        />
        <div className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          id="password"
          name="password"
          onChange={handleChange}
          type="password"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password confrimation
        </label>
        <input
          id="passwordConfirmation"
          name="passwordConfirmation"
          onChange={handleChange}
          type="password"
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Signup
      </button>
    </form>
  );
};

export default SignupForm;
