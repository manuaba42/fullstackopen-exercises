import FormField from './FormField'


const Form = ({ addPerson, newName, newNumber, handleNameChange, handleNumberChange}) => {
  return (
    <form onSubmit={addPerson}>
        <FormField text="name" value={newName} onChange={handleNameChange}/>
        <FormField text="number" value={newNumber} onChange={handleNumberChange}/>
        <div>
            <button type="submit">add</button>
        </div>
    </form>

  )
}

export default Form
