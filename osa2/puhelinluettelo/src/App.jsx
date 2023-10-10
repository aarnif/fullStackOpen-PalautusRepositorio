import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phoneNumber: "040-1231244" },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState(null);

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

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={handleNameChange} />
        </div>
        <div>
          number: <input onChange={handlePhoneNumberChange} />
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>
          {person.name} {person.phoneNumber}
        </p>
      ))}
    </div>
  );
};

export default App;
