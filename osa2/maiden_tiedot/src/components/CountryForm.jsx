import React from "react";

const CountryForm = ({ searchWord, handleChange }) => {
  return (
    <div>
      find countries <input value={searchWord} onChange={handleChange}></input>
    </div>
  );
};

export default CountryForm;
