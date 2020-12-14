import React, {useMemo, useState} from 'react';
import {useLocation} from "react-router-dom";

import TextField from '@material-ui/core/TextField';

import './CountriesList.scss'

import CountryRow from "../CountryRow/CountryRow";


function CountriesList(props) {
    const location = useLocation();
    const [filter, setFilter] = useState('');
    const countriesList = (location.pathname !== '/favorites') ? props.countriesList : props.countriesList.filter(country => country.isLiked)

    const rows = useMemo(() => {
           return (props.hasFetched && countriesList.map(country =>
                (filter.length < 2 || country.name.toLowerCase().includes(filter.toLowerCase())) &&
                <CountryRow className="CountriesList__Country" key={country.alpha2Code} {...country}/>
            ))
        }, [countriesList, filter, props.hasFetched])

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