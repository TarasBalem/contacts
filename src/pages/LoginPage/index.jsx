import React, {useState} from "react";
import PropTypes from "prop-types";
import {useHistory} from "react-router-dom";
import LoginForm from "pages/LoginPage/components/LoginForm";
import ErrorMessage from "components/ErrorMessage";
import Spinner from "components/Spinner";
import api from "api";

const LoginPage = ({loginApp}) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const loginUser = (email, password) => {
    setLoading(true);
    api.users
      .login(email, password)
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
      {loading ? <Spinner /> : <LoginForm loginUser={loginUser} />}
    </div>
  );
};

LoginPage.propTypes = {
  loginApp: PropTypes.func.isRequired,
};

export default LoginPage;
