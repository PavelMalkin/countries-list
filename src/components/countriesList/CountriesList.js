import React from 'react';
import {useLocation} from "react-router-dom";

import './CountriesList.scss'

import CountryRow from "../CountryRow/CountryRow";


function CountriesList(props) {
    const location = useLocation();
    const countriesList = (location.pathname === '/favorites')? props.favorites : props.countriesList

    const rows = (props.hasFetched && countriesList.map(country =>
            <CountryRow className="CountriesList__Country" key={country.numericCode} {...country}/>
    ))

    return (
        <div className='CountriesList'>
            {rows}
        </div>
    );
}

export default CountriesList;