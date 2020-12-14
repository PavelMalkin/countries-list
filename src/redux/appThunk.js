import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios'

export const getCountriesList = createAsyncThunk('getCurrentWeather', () => {
    return  axios.get('https://restcountries.eu/rest/v2/all')
    // return  axios.get('https://restcountries.eu/rest/v2/regionalbloc/eu')
        .then(res => res.data)
        .catch(err=> {
            throw new Error(err)})
})