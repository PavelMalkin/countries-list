import {createReducer} from "@reduxjs/toolkit";

import {getCountriesList} from "../appThunk";
import {setCountriesFromStorage, toggleFavoriteCountry} from "../actions/countriesActions";

const initialState = {
    countriesList: [],
    favorites: [],
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
        state.countriesList = action.payload;
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
        let tempArray = [...state.favorites]
        if (action.payload.isLiked) {
            tempArray.forEach((country, index)=>{
                if (country.alpha2Code === action.payload.country.alpha2Code) {
                    tempArray.splice(index, 1)
                }
            })
        } else { tempArray.push(action.payload.country) }
        return {...state,
        favorites: tempArray};
    },

})

export default countriesReducer;