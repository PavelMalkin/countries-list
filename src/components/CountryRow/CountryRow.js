import React from 'react';
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {makeStyles} from "@material-ui/core/styles";
import {Button, Typography} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";

import "./CountryRow.scss"

import {toggleFavoriteCountry} from "../../redux/actions/countriesActions";

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


function CountryRow(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const favorites = useSelector(store => store.countries.favorites)
    const isLiked = favorites.some(country => country.alpha2Code === props.alpha2Code);


    const likeButton = isLiked ? {
        color: '#F00',
        class: 'CountryRow__favorite-button-liked'
    } : {
        color: '#FFF',
        class: 'CountryRow__favorite-button'
    }

    const handleClick = () => {
        console.log('{country: {...props}, isLiked: false}')
        dispatch(toggleFavoriteCountry({country: {...props}, isLiked}))
    }

    return (
        <div className="CountryRow">
            <NavLink to={`/?country=${props.name}`} className="CountryRow__Line">
                <Button className="CountryRow__Line__Button">
                    <div className="CountryRow__Line__Button__Avatar">
                        <Avatar variant='square' alt={props.name} className={classes.large}
                                src={props.flag}/>
                        <ListItemText primary={props.name}/>
                    </div>
                    <Typography className="CountryRow__Line__Button__Name">{props.capital}</Typography>
                    <Typography className="CountryRow__Line__Button__TimeZone">{props.timezones[0]}</Typography>
                </Button>
            </NavLink>
            <div className={likeButton.class} onClick={handleClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="21.5" height="20.5">
                    <path fill={likeButton.color} fillRule="evenodd" stroke='#F00'
                          d="M15.063.5c-2.169 0-3.634.904-4.563 1.839C9.57 1.434 8.105.5 5.936.5 2.359.5.5 3.545.5 6.531c0 6.967 10 12.969 10 12.969s10-6.002 10-12.969C20.5 3.545 18.64.5 15.063.5z"/>
                </svg>
            </div>
        </div>
    );
}

export default CountryRow;