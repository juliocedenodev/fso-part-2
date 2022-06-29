import { useState, useEffect } from 'react';
import axios from 'axios';

function CountryDetail ({array, id}) {
  return(
    <div>
      <h2>{array[id].name.common}</h2>
      <p>Capital: {array[id].capital}</p>
      <p>Area: {array[id].area}</p>
      <p>Population: {array[id].population} habitants</p>
        <h3>Languages</h3>
        <ul>
        {Object.entries(array[id].languages).map(([key, value])=>
          <li key={key}>{value}</li>
            )}
        </ul>
      <img src={array[id].flags.svg} alt="the flag"></img>
    </div>
  );
}


function Country({filter}){
  const [show, setShow] = useState(false)

  const showCountryHandler = (id) => {
    const filterMap = filter.map(e => e.cca2)
    const search = filterMap.indexOf(filterMap[id]);
  
    console.log(search);
      return(<CountryDetail array={filter} id={search}/>);
    
  };

  const buttonClick = () => {
  setShow(!show)
  } 

  if(filter.length > 10)
      {
        return(<p>The query must be more specific</p>);
      }
  if(filter.length === 1)
  {
    return( <CountryDetail array={filter} id={0}/>) 
  }

  return(
    <div>
    {
    filter.map((country) =>
      <div key={country.cca2}>
      <p >{country.name.common}</p>
      <button onClick={(buttonClick)}>Show</button>
      {show && showCountryHandler(filter.indexOf(country))}
      </div>)
    }
  </div>
  )

}

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');


  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
      });
  }, [])


  const filter = countries.filter(country =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );


  const handleSearchChange = (e) => setSearch(e.target.value) 
  return (
    <div>
      <input value={search} onChange={handleSearchChange}/> 
      <p> 
        { 
        search && <Country filter={filter} />
        }  
      </p> 
    </div>
  );
}

export default App;
