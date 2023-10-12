import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import {
  getAllPersons,
  addNewPerson,
  deletePerson,
  updatePhoneNumber,
} from "./phoneService.js";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [filterCondition, setFilterCondition] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const successMessageType = "success";
  const errorMessageType = "error";

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
      const newPersons = persons.filter(
        (person) => person.id !== deletePersonId
      );
      deletePerson(deletePersonId)
        .then(() => {
          displayMessage(`Deleted ${person.name}`, successMessageType);
          setPersons(newPersons);
        })
        .catch(() => {
          displayMessage(
            `Information of ${person.name} has already been removed from server`,
            errorMessageType
          );
          setPersons(newPersons);
        });
    }
  };

  const handleUpdatePhoneNumber = (currentData, newData) => {
    updatePhoneNumber({
      ...currentData,
      number: newData.number,
    })
      .then(() => {
        const updatedPersons = persons.map((person) =>
          currentData.id === person.id
            ? { ...person, number: newData.number }
            : person
        );
        displayMessage(
          `Updated phone number for ${newData.name}`,
          successMessageType
        );
        setPersons(updatedPersons);
      })
      .catch(() => {
        displayMessage(
          `Information of ${newData.name} has already been removed from server`,
          errorMessageType
        );
        const currentPersons = persons.filter(
          (person) => currentData.id !== person.id
        );
        setPersons(currentPersons);
      });
  };

  const handleAddPerson = (person) => {
    addNewPerson(person).then((res) => {
      displayMessage(`Added ${person.name}`, successMessageType);
      setPersons(persons.concat(res));
    });
  };

  const handleSubmit = () => {
    event.preventDefault();
    const newPerson = { name: newName, number: newPhoneNumber };
    const checkIfPersonExists = persons.find(
      (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
    );

    if (checkIfPersonExists) {
      const confirmUpdatePhoneNumber = confirm(
        `${newPerson.name} is already added to phonebook, replace the old number with a new one?`
      );
      if (confirmUpdatePhoneNumber) {
        handleUpdatePhoneNumber(checkIfPersonExists, newPerson);
      }
    } else {
      handleAddPerson(newPerson);
    }
    setNewName("");
    setNewPhoneNumber("");
  };

  const displayMessage = (message, type) => {
    setMessage(message);
    setMessageType(type);
    setTimeout(() => {
      setMessage(null);
      setMessageType(null);
    }, 2000);
  };

  const shownPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filterCondition.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType} />
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
