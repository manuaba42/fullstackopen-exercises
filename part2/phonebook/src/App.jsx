import { useState } from 'react'


const App = () => {
  const [persons, setPersons] = useState([
    { id:1, name: 'Arto Hellas', number:'040-123456' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

  // console.log(persons)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} 
          onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} 
          onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.id}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App
