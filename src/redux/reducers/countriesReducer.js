import {createReducer} from "@reduxjs/toolkit";

import {getCountriesList} from "../appThunk";

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

})

export default countriesReducer;