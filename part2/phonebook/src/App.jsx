import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newPerson, setNewPerson] = useState(persons)

  const hook = () => {
    console.log('promise fulfilled')
    // const eventHandler = response => {
    //     setPersons(response.data)
    //     setNewPerson(response.data)
    // }

    // const promise = axios.get('http://localhost:3001/persons')
    // promise.then(eventHandler)

    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
      setNewPerson(initialPersons)
    })
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
      // setPersons(persons.concat(personObject))
      // setNewName('')
      // setNewNumber('')
      // setNewPerson(persons.concat(personObject))

      personService.create(personObject).then(returnedPersons => {
        setPersons(persons.concat(returnedPersons))
        setNewName('')
        setNewNumber('')
        setNewPerson(persons.concat(returnedPersons))

      })
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

  const deletePersons = (id) => {
    // console.log(id)
    const person = persons.find(n => n.id === id)
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.deletePerson(id).then(returnedPersons => {
        alert(`${person.name} is deleted`)
        setPersons(persons.filter(n => n.id !== id))
        setNewPerson(persons.filter(n => n.id !== id))
      })}
    console.log(person)
    }

  // console.log(newPerson)
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <Form addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons newPerson={newPerson} deletePerson={deletePersons}/>
    </div>
  )
}

export default App
