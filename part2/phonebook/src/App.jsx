import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newPerson, setNewPerson] = useState(persons)
  const [alertMessage, setAlertMessage] = useState({message: null, type: null})


  const hook = () => {
    // console.log('promise fulfilled')
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
      // id: persons.length + 1,
    }
    let isInPerson = false
    // console.log(persons.includes(newName))
    persons.map(person => {
      if (person.name === newName) {
        isInPerson = true
      }
    })
    if (isInPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const personToUpdate = persons.find(n => n.name === newName)
        const changedPerson = { ...personToUpdate, number: newNumber }

        personService.update(personToUpdate.id, changedPerson).then(returnedPerson => {
          const updatedPersons = persons.map(person => person.id !== personToUpdate.id ? person : returnedPerson)
          setPersons(updatedPersons)
          setNewPerson(updatedPersons)
          setAlertMessage({message: `${newName} is updated`, type: 'success'})
          setTimeout(() => {
            setAlertMessage({message: null, type: null})
          }, 5000)
          setNewName('')
          setNewNumber('')
        }).catch(error => {
          setAlertMessage({message: `Information of ${newName} has already been removed from server`, type: 'error'})
          setTimeout(() => {
            setAlertMessage({message: null, type: null})
          }, 5000)
          const updatedPersons = persons.filter(n => n.id !== personToUpdate.id)
          setPersons(updatedPersons)
          setNewPerson(updatedPersons)
          setNewName('')
          setNewNumber('')
        })
      }

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
        setAlertMessage({message: `Added ${newName}`, type: 'success'})
        setTimeout(() => {
          setAlertMessage({message: null, type: null})
        }, 5000)
      }).catch(error => {
        setAlertMessage({message: error.response.data, type: 'error'})
        setTimeout(() => {
          setAlertMessage({message: null, type: null})
        }, 5000)
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
        // alert(`${person.name} is deleted`)
        setAlertMessage({message: `${person.name} is deleted`, type: 'success'})
          setTimeout(() => {
            setAlertMessage({message: null, type: null})
          }, 5000)

        setPersons(persons.filter(n => n.id !== id))
        setNewPerson(persons.filter(n => n.id !== id))
      }).catch(error => {
        setAlertMessage({message: `Information of ${person.name} has already been removed from server`, type: 'error'})
        setTimeout(() => {
          setAlertMessage({message: null, type: null})
        }, 5000)
        setPersons(persons.filter(n => n.id !== id))
        setNewPerson(persons.filter(n => n.id !== id))
      })
    }
    // console.log(person)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={alertMessage.message} type={alertMessage.type} />
      <h3>Filter</h3>
      <Filter filterChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <Form addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons newPerson={newPerson} deletePerson={deletePersons}/>
    </div>
  )
}

export default App
