import React, { useEffect } from "react";
import "./App.css";

const Alert = ({ msg, type, removeAlert, list }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [list, removeAlert]);
  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
