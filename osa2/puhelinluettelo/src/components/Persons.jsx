import React from "react";

const Persons = ({ persons, handleDeletePerson }) => {
  return (
    <>
      {persons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}{" "}
          <button onClick={() => handleDeletePerson(person)}>Delete</button>
        </p>
      ))}
    </>
  );
};

export default Persons;
