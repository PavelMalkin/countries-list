import React, {useState} from 'react';
import {useLocation} from "react-router-dom";

import TextField from '@material-ui/core/TextField';

import './CountriesList.scss'

import CountryRow from "../CountryRow/CountryRow";


function CountriesList(props) {
    const location = useLocation();
    const [filter, setFilter] = useState('');
    const countriesList = (location.pathname === '/favorites') ? props.favorites : props.countriesList

    function searchName(value, string) {
        let result = false;
        const lowValue = value.toLowerCase();
        const lowString = string.toLowerCase();
        for (let i = 0; i <= string.length - value.length; i++) {
            if (lowValue === lowString.slice(i, i + value.length)) {
                result = true;
                i = string.length;
            }
        }
        return result
    }

    const rows = (props.hasFetched && countriesList.map(country => {
        if (filter.length < 2 || searchName(filter, country.name)) {
            return <CountryRow className="CountriesList__Country" key={country.numericCode} {...country}/>
        }
    }))

    const handleFilter = (e) => {
        setFilter(e.target.value)
    }

    return (
        <div className='CountriesList'>
            <TextField label="Filter country by name"
                       variant="outlined"
                       className="CountriesList__Search"
                       value={filter}
                       onChange={handleFilter}/>
            {rows}
        </div>
    );
}

export default CountriesList;