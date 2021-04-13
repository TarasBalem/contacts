import React from "react";

const ErrorMessage = ({children}) => {
  return <div className="alert alert-danger">{children}</div>;
};

export default ErrorMessage;
