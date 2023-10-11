import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import { getAllPersons, addNewPerson, deletePerson } from "./phoneService.js";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [filterCondition, setFilterCondition] = useState("");

  useEffect(() => {
    getAllPersons().then((data) => setPersons(data));
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

  const handleDeletePerson = (person) => {
    const confirmDeletePerson = confirm(`Delete ${person.name} ?`);

    if (confirmDeletePerson) {
      const deletePersonId = person.id;
      deletePerson(deletePersonId).then((res) => {
        const newPersons = persons.filter(
          (person) => person.id !== deletePersonId
        );
        setPersons(newPersons);
      });
    }
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
    } else {
      addNewPerson(newPerson).then((res) => {
        setPersons(persons.concat(res));
      });
      setNewName("");
      setNewPhoneNumber("");
    }
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
        newName={newName}
        newPhoneNumber={newPhoneNumber}
        handleNameChange={handleNameChange}
        handlePhoneNumberChange={handlePhoneNumberChange}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons persons={shownPersons} handleDeletePerson={handleDeletePerson} />
    </div>
  );
};

export default App;
