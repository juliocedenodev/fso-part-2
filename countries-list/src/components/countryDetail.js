import { useState, useEffect } from 'react';
import axios from 'axios';

function CountryDetail ({array, id, api_key}) {

  const [weather, setWeather] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${array[id].capital}&appid=${api_key}&units=metric`)
      .then(response => {
        setWeather(response.data);
      });
  }, [api_key, array, id])

  return(
    <div>
      <h2>{array[id].name.common}</h2>
      <p>Capital: {array[id].capital}</p>
      <p>Area: {array[id].area}</p>
      <p>Population: {array[id].population.toLocaleString()} habitants</p>
        <h3>Languages</h3>
        <ul>
        {Object.entries(array[id].languages).map(([key, value])=>
          <li key={key}>{value}</li>
            )}
        </ul>
      <img src={array[id].flags.svg} alt="the flag"></img>
      <h3>Weather in {array[id].capital}</h3>
      <p>temperature {weather.main?.temp} Celsius</p>
      <img src={`https://openweathermap.org/img/wn/${weather.weather?.map(x=>x.icon)}@2x.png`} alt="aaa"></img>      
      <p>Wind {weather.wind?.speed} m/s</p>
    </div>
  );
}

export default CountryDetail;