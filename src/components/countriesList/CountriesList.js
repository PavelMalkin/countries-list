import React, {useMemo, useState} from 'react';
import {useLocation} from "react-router-dom";
import {List} from 'react-virtualized';

import TextField from '@material-ui/core/TextField';

import './CountriesList.scss'

import classes from '../row/CountryRow.scss'
import CountryRow from "../row/CountryRow";


function CountriesList(props) {
    const location = useLocation();
    const [filter, setFilter] = useState('');
    const countriesList = (location.pathname !== '/favorites') ? props.countriesList : props.countriesList.filter(country => country.isLiked)
    const filteredList = (countriesList.length && countriesList.filter(country =>
        (filter.length < 2 || country.name.toLowerCase().includes(filter.toLowerCase()))
    ))


    const rows = useMemo(() => (props.hasFetched && filteredList.map(country =>
        <CountryRow className="CountriesList__Country" key={country.alpha2Code} {...country}/>
    )), [filteredList, props.hasFetched])

    const handleFilter = (e) => {
        setFilter(e.target.value)
    }

    const style = classes.CountryRow

    function rowRenderer({
                             key, // Unique key within array of rows
                             index, // Index of row within collection
                             isScrolling, // The List is currently being scrolled
                             isVisible, // This row is visible within the List (eg it is not an overscanned row)
                             style, // Style object to be applied to row (to position it)
                         }) {
        return (
            <div key={key} style={style}>
                {rows[index]}
            </div>
        );
    }


    return (
        <div className='CountriesList'>
            <TextField label="Filter country by name"
                       variant="outlined"
                       className="CountriesList__Search"
                       value={filter}
                       onChange={handleFilter}/>
            <List
                width={1000}
                height={1000}
                rowCount={countriesList.length}
                rowHeight={50}
                rowRenderer={rowRenderer}
                containerStyle={{
                    width: "100%",
                    maxWidth: "100%"
                }}
            />

        </div>
    );
}

export default CountriesList;