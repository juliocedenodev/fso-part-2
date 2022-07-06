import { useState } from 'react';

import CountryDetail from './countryDetail';

function Country({filter, api}){
    const [show, setShow] = useState(false);
    const [index, setIndex] = useState(-1);
  
    const buttonClick = (id) => {
    setIndex(id)
    setShow(!show)
    } 
  
    if(filter.length > 10)
      {
        return(<p>The query must be more specific</p>);
      }

    if(filter.length === 1)
      {
        return( <CountryDetail array={filter} id={0} api_key={api}/>); 
      }
  
    return(
      <div>
      {
      filter.map((country, id) =>
        <div key={country.cca2}>
        <p >{country.name.common}</p>
        <button onClick={()=>buttonClick(filter.indexOf(country))}>Show</button>
        {
         id === index ? show && <CountryDetail array={filter} id={index} api_key={api}/> : show
        }
        </div>)
      }
     
    </div>
    )
  
  }

  export default Country;