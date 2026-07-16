import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'



const App = () => {
  // const [persons, setPersons] = useState([
  //   { name: 'Arto Hellas', number: '040-123456', id: 1 },
  //   { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
  //   { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
  //   { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  // ]) 
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newPerson, setNewPerson] = useState(persons)

  const hook = () => {
    const eventHandler = response => {
      console.log('promise fulfilled')
        setPersons(response.data)
        setNewPerson(response.data)
    }

    const promise = axios.get('http://localhost:3001/persons')
    promise.then(eventHandler)

  }

  useEffect(hook, [])


  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    let isInPerson = false
    // console.log(persons.includes(newName))
    persons.map(person => {
      if (person.name === newName) {
        isInPerson = true
      }
    })
    if (isInPerson) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      // alert(`${newName} is added`)
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
      setNewPerson(persons.concat(personObject))
    }
  }


  const handleNumberChange = (event) => {
    // console.log(event.target.value)
    setNewNumber(event.target.value)
  }


  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  

  const handleFilterChange = (event) => {
    const flteredPerson = event.target.value === '' 
    ? persons 
    : persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase()));
    // console.log(flteredPerson)
    setNewPerson(flteredPerson)
  }

  // console.log(newPerson)
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <Form addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons newPerson={newPerson}/>
    </div>
  )
}

export default App
