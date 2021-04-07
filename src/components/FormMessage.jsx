import React from "react";
import PropTypes from "prop-types";

const FormMessage = ({type, children}) => {
  return (
    <div className={type === "error" ? "invalid-feedback" : "valid-feedback"}>
      {children}
    </div>
  );
};

FormMessage.propTypes = {
  type: PropTypes.oneOf(["error", "info"]).isRequired,
};

FormMessage.defaultProps = {
  type: "error",
};

export default FormMessage;
