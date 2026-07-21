import { useState, useEffect } from "react";
import countriesService from './services/countries'
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([])
  const [newCountries, setNewCountries] = useState([])

  const hook = () => {
    console.log('promise fulfilled')

    countriesService.getAll().then(initialCountries => {
      setCountries(initialCountries)
      console.log(initialCountries)
    })
    console.log('promise done')

  }

  useEffect(hook, [])

  const handleFilterChange = (event) => {
    const flteredCountry = event.target.value === ''
      ? countries
      : countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()));
    // console.log(flteredPerson)
    // if (flteredCountry.length >= 10) {
    //   alert('Too many matches, specify another filter')
    // }
    // else {
    // }
    setNewCountries(flteredCountry)
  }

  return (
    <div>
      find countries <input onChange={handleFilterChange}></input>
      {newCountries.length === 0 ? (
        <p></p>
      )
        :
        newCountries.length >= 10 ? (
          <p>Too many matches, specify another filter</p>
        ) :
          newCountries.length === 1 ? (
            <Countries newCountries={newCountries[0]} />
          ) : 
          (newCountries.map(country => (
            <p key={country.name.common}>{country.name.common}</p>
          ))
          )}
    </div>
  )
}

export default App;
