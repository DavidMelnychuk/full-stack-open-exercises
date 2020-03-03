import React, { useState } from "react";
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const addPerson = event => {
    event.preventDefault();
    const newPerson = {
      name: newName
    };
    setPersons(persons.concat(newPerson));
    setNewName("");
  };

  const displayNumbers = () => persons.map(person => <Person key={person.name} name={person.name}/>)
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>{displayNumbers()}</div>
      <div>debug: {newName}</div>
    </div>
  );
};

export default App;
