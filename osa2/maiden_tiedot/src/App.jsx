import { useState, useEffect } from "react";
import CountryForm from "./components/CountryForm";
import { getAllCountries } from "./countryService";
import Countries from "./components/Countries";
import Country from "./components/Country";

function App() {
  const [searchWord, setSearchWord] = useState("");
  const [countries, setCountries] = useState([]);
  let showPart = null;

  useEffect(() => {
    getAllCountries().then((data) => setCountries(data));
  }, []);

  const handleCountryFormChange = () => {
    const inputValue = event.target.value;
    setSearchWord(inputValue);
  };

  const handleShowCountry = (countryName) => {
    setSearchWord(countryName);
  };

  const showCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchWord.toLowerCase())
  );

  if (searchWord && showCountries.length > 10) {
    showPart = <div>Too many matches, specify another filter</div>;
  } else if (showCountries.length <= 10 && showCountries.length > 1) {
    showPart = (
      <Countries countries={showCountries} handleShow={handleShowCountry} />
    );
  } else if (showCountries.length == 1) {
    showPart = <Country country={showCountries[0]} />;
  } else if (searchWord.length > 0) {
    showPart = <div>No results</div>;
  }

  return (
    <>
      <CountryForm
        searchWord={searchWord}
        handleChange={handleCountryFormChange}
      />
      {showPart}
    </>
  );
}

export default App;
