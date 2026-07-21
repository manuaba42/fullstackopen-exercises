import { useState, useEffect } from "react";
import weatherService from "../services/weather";

const Countries = (props) => {
    // const [lat, setLat] = []
    // const [lon, setLon] = []
    const [weather, setWeather] = useState(null)

    const gerWeather = () => {
        console.log('promise fulfilled for weather')
        const lat = props.newCountries.latlng[0]
        const lon = props.newCountries.latlng[1]
        console.log(lat, lon)
        weatherService.getWeather(lat, lon).then(response => {
            console.log(response)
            setWeather(response)
            console.log(weather)
        })
    }

    useEffect(gerWeather, [])
    
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
        <h2>Weather in {props.newCountries.capital}</h2>
        {weather !== null && 
        <div>
            <p>temperature: {weather.main.temp} Celcius</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />
            <p>Wind {weather.wind.speed} m/s</p>
        </div>
        }
        
        {/* <p>temperature: {weather.main.temp} Celcius</p> */}
        {/* <p>wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p> */}
    </div>
    )
}

export default Countries
