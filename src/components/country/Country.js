import React from 'react';
import {useSelector} from "react-redux";

import {Paper, Typography, ListItemText} from "@material-ui/core";

import './Country.scss'

function Country(props) {
    const countries = useSelector(store => store.countries);
    const country = (countries.hasFetched && countries.countriesList.find(country => country.name === props.name))

    const timeZones = (country && country.timezones.map(time =>
        <li key={time}>
            <ListItemText primary={time}/>
        </li>
    ))

    const listLanguages = (country && country.languages.map(lang =>
        <li key={lang.iso639_2}>
            <ListItemText primary={`Name: ${lang.name}, native name: ${lang.nativeName} `}/>
        </li>
    ) )

    const listTranslations = (country && Object.keys(country.translations).map(code =>
        <li key={code}>
            <ListItemText primary={`Code: ${code}, name: ${country.translations[code]} `}/>
        </li>
    ) )

    return (
        <Paper className="Country">
            <img src={country.flag} alt={country.name} className="Country__Flag"/>
            <Typography variant='h3'>{country.name}</Typography>
            <Typography variant='h3'>{country.nativeName}</Typography>
            <Typography variant='h4'>Capital: {country.capital}</Typography>
            <Typography variant='h4'>Population {country.population} people</Typography>
            <div className="Country__Lists">
                <div className="Country__Lists__Container">
                    <div className="Country__Lists__Container__Content">
                    <Typography variant="h5">List of Languages</Typography>
                    {listLanguages}
                    </div>
                </div>
                <div className="Country__Lists__Container">
                    <div className="Country__Lists__Container__Content">
                    <Typography variant="h5">List of Translations</Typography>
                    {listTranslations}
                    </div>
                </div>
                <div className="Country__Lists__Container">
                    <div className="Country__Lists__Container__Content">
                        <Typography variant="h5">Time Zones</Typography>
                        {timeZones}
                    </div>
                </div>
            </div>
        </Paper>
    );
}

export default Country;