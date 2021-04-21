import React, {useState} from "react";
import PropTypes from "prop-types";
import {useHistory} from "react-router-dom";
import SignupForm from "pages/SignupPage/components/SignupForm";
import ErrorMessage from "components/ErrorMessage";
import Spinner from "components/Spinner";
import api from "api";

const SignupPage = ({loginApp}) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const createUser = (email, password) => {
    setLoading(true);
    api.users
      .create(email, password)
      .then((userCredential) => {
        loginApp(userCredential.user);
        setError(null);
        setLoading(false);
        history.push("/");
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <div>
      {error ? <ErrorMessage>{error}</ErrorMessage> : null}
      {loading ? <Spinner /> : <SignupForm createUser={createUser} />}
    </div>
  );
};

SignupPage.propTypes = {
  loginApp: PropTypes.func.isRequired,
};

export default SignupPage;
