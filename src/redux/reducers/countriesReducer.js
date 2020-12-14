import {createReducer} from "@reduxjs/toolkit";

import {getCountriesList} from "../appThunk";
import {setCountriesFromStorage, toggleFavoriteCountry} from "../actions/countriesActions";

const initialState = {
    countriesList: [],
    hasFetched: false,
    isFetching: false,
    isFetchingError: null
}

const countriesReducer = createReducer(initialState, {
    [getCountriesList.pending]: (state) => {
        state.isFetching = true;
        state.hasFetched = false;
        state.isFetchingError = null;
    },
    [getCountriesList.rejected]: (state, action) => {
        state.isFetchingError = action.error.message;
        state.isFetching = false;
        return state;
    },
    [getCountriesList.fulfilled]: (state, action) => {
        action.payload.forEach(country => {
            state.countriesList.push({
                name: country.name,
                nativeName: country.nativeName,
                flag: country.flag,
                capital: country.capital,
                population: country.population,
                timezones: country.timezones,
                alpha2Code: country.alpha2Code,
                languages: country.languages,
                translations: country.translations,
                isLiked: false,
            })
        })
        state.hasFetched = true;
        state.isFetching = false;
        return state;
    },
    [setCountriesFromStorage]: (state, action) => {
        state.countriesList = action.payload;
        state.hasFetched = true;
        state.isFetching = false;
        return state;
    },
    [toggleFavoriteCountry]: (state, action) => {
        state.countriesList.forEach((country, index) => {
            if (country.alpha2Code === action.payload.alpha2Code) {
                state.countriesList[index].isLiked = !action.payload.isLiked
            }
        })
        return state;
    },

})

export default countriesReducer;