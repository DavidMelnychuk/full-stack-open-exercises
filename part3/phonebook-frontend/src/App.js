import React, { useState, useEffect } from "react";
import Person from "./components/Person";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);

  const hook = () => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  };

  useEffect(hook, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    const person = persons.find((person) => person.name === newName);

    if (person) {
      if (
        window.confirm(
          `${person.name} is already added to the phonebook, do you wish to replace the old number with a new one?`
        )
      ) {
        personService
          .updatePerson(person.id, newPerson)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === updatedPerson.id ? updatedPerson : person
              )
            );
            setNewName("");

            setNotificationMessage(
              `The phone number for ${updatedPerson.name} has been successfully updated.`
            );
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
          });
      }
      return;
    }
    personService
      .create(newPerson)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");

        setNotificationMessage(`Added ${returnedPerson.name}`);
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data);
        setNotificationMessage(`${error.response.data.error}`);
      });
  };

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(person.id)
        .then(() => {
          personService.getAll().then((returnedPersons) => {
            setPersons(returnedPersons);
          });
        })
        .catch((error) => console.log(error));
    }
  };

  const displayNumbers = () =>
    persons.map((person) => (
      <Person
        key={person.name}
        name={person.name}
        number={person.number}
        deletePerson={() => deletePerson(person)}
      />
    ));

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notificationMessage} />
      <h2>Add a New Person</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons displayNumbers={displayNumbers} />
    </div>
  );
};

export default App;
