import React from "react";

function Alert({ alert }) {
  return (
    alert !== null && (
      <div className={`alert alert-${alert.color}`}>
        <i className="fas fa-info-circle"></i>
        {alert.message}
      </div>
    )
  );
}

export default Alert;
