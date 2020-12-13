import React from 'react';
import {NavLink} from "react-router-dom";

import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import {makeStyles} from '@material-ui/core/styles';
import {Button, Typography} from "@material-ui/core";

import './CountriesList.scss'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    large: {
        width: theme.spacing(6),
        height: theme.spacing(4),
    },
}));

function CountriesList(props) {
    const classes = useStyles();

    const rows = (props.hasFetched && props.countriesList.map(country => {
        return <div className="CountriesList__Country" key={country.numericCode}>
            <NavLink to={`/?country=${country.name}`}>
                <Button className="CountriesList__Country__row">
                    <div className="CountriesList__Country__row__Avatar">
                        {/*<img alt={country.name} src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${country.alpha2Code}.svg`} />*/}
                        <Avatar variant='square' alt={country.name} className={classes.large}
                                src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${country.alpha2Code}.svg`}/>
                        <ListItemText primary={country.name}/>
                    </div>
                    <Typography className="CountriesList__Country__row__Name">{country.capital}</Typography>
                    <Typography className="CountriesList__Country__row__TimeZone">{country.timezones[0]}</Typography>
                </Button>
            </NavLink>
        </div>
    }))

    return (
        <div className='CountriesList'>
            {rows}
        </div>
    );
}

export default CountriesList;