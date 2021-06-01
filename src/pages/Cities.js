import React, { useState } from 'react'
import { Container } from 'react-bootstrap';
import SearchBox from '../components/SearchBox/SearchBox';
import cityJSON from '../data/cities.json';
import CityModel from '../model/CityModel';

export default function Cities() {
    const [cities, setCities] = useState(cityJSON.cities.map((city, index) => new CityModel(city, index)));
    const [searchText, setSearchText] = useState("");
    const [results, setResults] = useState([]);

    function handleSearchChange(newSearchText) {
        setSearchText(newSearchText);
  
        if (newSearchText) {
            debugger
            setResults(cities.filter(element => element.name.toLowerCase().includes(newSearchText.toLowerCase())));
        } else {
           setResults([]);
        }
    }

    function getCityImages(city) {
        debugger
        const test = results.length > 0 ? console.log("Get Image of " + results[city].name) : null;
        setSearchText([results[city].name])
        setResults([]);
    }

    return (
        <div className="p-cities">
         <Container>
            <SearchBox
               placeholder="Enter a city"
               searchText={searchText}
               onSearchChange={handleSearchChange}
               results={results.map(result => result.name)}
               onResultSelected={getCityImages} />
            {/* <div id="main_cards">
               {results}
            </div> */}
         </Container>
      </div>
    )
}
