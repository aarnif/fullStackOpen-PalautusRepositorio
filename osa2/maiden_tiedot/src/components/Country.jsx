import React, { useEffect, useState } from "react";
import axios from "axios";

const Country = ({ country }) => {
  const [weatherReport, setWeatherReport] = useState(null);
  const api_key = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${country.capital[0]}`
      )
      .then((res) => setWeatherReport(res.data));
  }, []);

  const convertToMetresPerSecond = (kilometersPerHour) => {
    return ((kilometersPerHour * 1000) / 3600).toFixed(2);
  };

  return (
    <>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital[0]}</div>
      <div>area {country.area}</div>
      <h2>languages:</h2>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png}></img>
      {weatherReport && (
        <>
          <h1>{`Weather in ${country.capital[0]}`}</h1>
          <div>temperature {weatherReport.current.temp_c} Celcius</div>
          <img src={weatherReport.current.condition.icon}></img>
          <div>
            wind {convertToMetresPerSecond(weatherReport.current.wind_kph)} m/s
          </div>
        </>
      )}
    </>
  );
};

export default Country;
