import React, { useState } from 'react';
import axios from 'axios';
import './style.css'

const CountryPopulation = () => {
  const [countryName, setCountryName] = useState('');
  const [population, setPopulation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPopulation = () => {
    setLoading(true);
    setError(null);

    axios.get(`https://restcountries.com/v3.1/name/${countryName}`)
      .then(response => {
        const country = response.data[0];
        setPopulation(country.population);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  };

  const handleInputChange = (e) => {
    setCountryName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPopulation();
  };

  return (
    <div> 
        <div>
            <h1>Country Population</h1>
            <form onSubmit={handleSubmit}>
            <input
            type="text"
            value={countryName}
            onChange={handleInputChange}
            placeholder="Enter country name"
            />
            <button type="submit">Get Population</button>
            </form>
        </div>
        <div className='output_div'>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {population !== null && <p>Population of {countryName}: {population.toLocaleString()}</p>}
        </div>
    </div>
  );
};

export default CountryPopulation;
//https://restcountries.com/v3.1/alpha/${code}
//https://restcountries.com/v3.1/name/${countryName}