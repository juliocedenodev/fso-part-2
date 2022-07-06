import { useState, useEffect } from 'react';
import axios from 'axios';
import Country from './components/Country';


function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');


  const api_key = process.env.REACT_APP_API_KEY;


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
        search && <Country filter={filter} api={api_key}/>
        }  
      </p> 
    </div>
  );
}

export default App;
