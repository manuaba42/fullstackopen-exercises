const Countries = (props) => {
  return (
    <div> 
        <h1>{props.newCountries.name.common}</h1>
        <div>capital {props.newCountries.capital}</div>
        <div>area {props.newCountries.area}</div>
        <h2>languages:</h2>
        <ul>{Object.entries(props.newCountries.languages).map(([code, languageName]) => (
        <li key={code}>
          {languageName}
        </li>))}</ul>
        <img src={props.newCountries.flags.png} alt="${props.newCountries.name.common}"></img>
    </div>
    )
}

export default Countries
