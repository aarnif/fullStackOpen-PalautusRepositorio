import axios from "axios";
const baseURL = "https://studies.cs.helsinki.fi/restcountries/api/";

const getAllCountries = () => {
  return axios.get(`${baseURL}/all`).then((res) => res.data);
};

export { getAllCountries };
