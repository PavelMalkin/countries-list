import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios'

export const getCountriesList = createAsyncThunk('getCurrentWeather', () => {
    return  axios.get('https://restcountries.eu/rest/v2/all')
        .then(res => res.data)
        .catch(err=> {
            throw new Error(err)})
})