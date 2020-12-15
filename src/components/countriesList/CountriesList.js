import React, {useMemo, useState} from 'react';
import {useLocation} from "react-router-dom";
import {List, AutoSizer} from 'react-virtualized';

import TextField from '@material-ui/core/TextField';

import './CountriesList.scss'

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


    function rowRenderer({key,index, style, }) {
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

            <AutoSizer>
                {({height, width}) => (<List
                    width={width}
                    height={height}
                    rowCount={countriesList.length}
                    rowHeight={50}
                    rowRenderer={rowRenderer}
                />)}
            </AutoSizer>

        </div>
    );
}

export default CountriesList;