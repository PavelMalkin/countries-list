import {createReducer} from "@reduxjs/toolkit";

import {getCountriesList} from "../appThunk";
import {setCitiesFromStorage, setCountryToFavorites, removeCountryFromFavorites} from "../actions/countriesActions";

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
        state.countriesList = action.payload;
        state.hasFetched = true;
        state.isFetching = false;
        return state;
    },
    [setCitiesFromStorage]: (state, action) => {
        state.countriesList = action.payload;
        state.hasFetched = true;
        state.isFetching = false;
        return state;
    },

})

export default countriesReducer;