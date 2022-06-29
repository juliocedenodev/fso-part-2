import { useState, useEffect } from 'react';

import phonebookService from './services/phonebook';

import Input from './components/Input';
import Persons from './components/Persons';
import Notification from './components/Notifications';

const App = () => {

  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const [search, setSearch] = useState('');
  const [searchTerm] = useState(["name", "number"]);

  const [errorMessage, setErrorMessage] = useState(null);
  const [successfulMessage, setSuccessfulMessage] = useState(null);

  useEffect(() =>
  {  
    phonebookService
      .getAll()
      .then(initialPersonList => {
        setPersons(initialPersonList);
      });
  },[]);

  const addPerson = (e) => {
    e.preventDefault();
    
    const isEqual = persons.find(p=> p.name === newName);
    const isNumberEqual = persons.find(p=> p.number === newNumber);
    try {
      if(!newName || !newNumber){
        alert("Try again, please");  
        return;
      }
      if(!isNumberEqual && isEqual) {
        updateHandler(isEqual.id);
      }

      if (isEqual){ 
        alert(`${newName} is already available on the phonebook`);
        
        return;
      }
      
      if(isNumberEqual){
        alert(`${newNumber} is ${isNumberEqual.name}'s number`);
        return;
      }

      const personObject = {
        name: newName,
        number: newNumber,
      };

      phonebookService
        .create(personObject)
        .then(changedPerson =>{
          setPersons(persons.concat(changedPerson));
          setNewName('');
          setNewNumber('');
          setSuccessfulMessage(`${changedPerson.name} added`);
            setTimeout(()=>
              {
                setSuccessfulMessage(null);
              },5000);
        })
    }

    catch(e){
      alert("Error: " + e);
    }
  }

  const deletePersonHandler = (id) => {
    phonebookService
      .deletePerson(id)
      .then(personDeleted => {
        setPersons(persons.map(p => p.id !== id ? p : personDeleted));
      })
  }

  const updateHandler = (id) =>{
    const person = persons.find(p=> p.name === newName);
    const changedPerson = {...person, number:newNumber };

    phonebookService
      .update(id, changedPerson)
      .then(returnedPerson => {
        if (window.confirm(`Would you like to change ${newName}'s number?`))
          {
            setPersons(persons.map(p => p.id !== id ? p : returnedPerson));
            setSuccessfulMessage(`${returnedPerson.name}'s number was changed successfully`);
            setTimeout(()=>
              {
                setSuccessfulMessage(null);
              },5000);
          }
        else
          {
            setNewName('');
            setNewNumber('');
          }  
      }).catch(error => {

        setErrorMessage(`The information of ${person.name} has already been removed from the server`);

        setTimeout(()=>{
          setErrorMessage(null);
        },5000)

        setPersons(persons.filter(p => p.id !== id));
      });
  }

  const searchPerson = (items, id) => 
  {   
    return items.filter((item) => {
      if(item.id !== id)
      {
        return searchTerm.some((newItem) => {
          return (
              item[newItem]
                  .toString()
                  .toLowerCase()
                  .indexOf(search.toLowerCase()) > -1
            );
        });
      }   
    });
  }

  const handleNameChange = (e) => setNewName(e.target.value); 
  const handleNumberChange = (e) => setNewNumber(e.target.value); 
  const handleSearchChange = (e) => setSearch(e.target.value);

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={errorMessage} color='red'/>
      <Notification message={successfulMessage} color='green'/>

      <form onSubmit={addPerson}>

        <Input text="Search a person:" value={search} change={handleSearchChange}/>

        <h2>Add a new person</h2>
        <Input text="Name:" value={newName} change={handleNameChange}/>
        <Input text="Number:" value={newNumber} change={handleNumberChange}/>
        <div>
          <button type="submit">add</button>
        </div>

      </form>
      <h2>Numbers</h2>

      {
      searchPerson(persons).map(p => 
      <Persons myKey={p.id} name={p.name} number={p.number} text='delete' click={()=>deletePersonHandler(p.id)}/>
        )
      }

    </div>
  );
}

export default App;