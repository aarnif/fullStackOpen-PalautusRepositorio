import React from "react";

const CountryForm = ({ handleChange }) => {
  return (
    <div>
      find countries <input onChange={handleChange}></input>
    </div>
  );
};

export default CountryForm;
