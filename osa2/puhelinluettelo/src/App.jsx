import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState(null);
  const [filterCondition, setFilterCondition] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((res) => {
      setPersons(res.data);
    });
  }, []);

  const handleFilterChange = () => {
    setFilterCondition(event.target.value);
  };

  const handleNameChange = () => {
    setNewName(event.target.value);
  };

  const handlePhoneNumberChange = () => {
    setNewPhoneNumber(event.target.value);
  };

  const handleSubmit = () => {
    event.preventDefault();
    const newPerson = { name: newName, number: newPhoneNumber };
    const checkIfPersonExists = persons.find(
      (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
    );

    if (checkIfPersonExists) {
      alert(`${newPerson.name} is already added to phonebook`);
      return;
    }

    axios.post("http://localhost:3001/persons", newPerson);
    setPersons(persons.concat(newPerson));
  };

  const shownPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filterCondition.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        handleNameChange={handleNameChange}
        handlePhoneNumberChange={handlePhoneNumberChange}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons persons={shownPersons} />
    </div>
  );
};

export default App;
