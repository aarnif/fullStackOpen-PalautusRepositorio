import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phoneNumber: "040-123456" },
    { name: "Ada Lovelace", phoneNumber: "39-44-5323523" },
    { name: "Dan Abramov", phoneNumber: "12-43-234345" },
    { name: "Mary Poppendieck", phoneNumber: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState(null);
  const [filterCondition, setFilterCondition] = useState("");

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
    const newPerson = { name: newName, phoneNumber: newPhoneNumber };
    const checkIfPersonExists = persons.find(
      (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
    );

    if (checkIfPersonExists) {
      alert(`${newPerson.name} is already added to phonebook`);
      return;
    }
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
