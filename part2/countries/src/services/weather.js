import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?'

const getWeather = (lat, lon, newObject) => {
    const request = axios.get(`${baseUrl}lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`, newObject)
    return request.then(response => response.data)
}

export default {
  getWeather: getWeather
}
