import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import './App.scss';

import CountriesList from "./components/countriesList/CountriesList";
import {getCountriesList} from "./redux/appThunk";
import {setCountriesFromStorage} from "./redux/actions/countriesActions"
import Country from "./components/country/Country";
import Navbar from "./components/navbar/Navbar";

function App() {
    const dispatch = useDispatch();
    const countries = useSelector(store => store.countries);
    const location = useLocation();
    const param = new URLSearchParams(location.search).get('country')

    useEffect(() => {
        if (!countries.hasFetched && !countries.isFetching && countries.isFetchingError === null) {
            dispatch(getCountriesList());
        }
    }, [countries.hasFetched, countries.isFetching, countries.isFetchingError, dispatch])


    useEffect(() => {
            if (countries.hasFetched && countries.countriesList.length) {
                localStorage.setItem('CountriesList', JSON.stringify(countries.countriesList))
            } else if (localStorage.getItem('CountriesList') && countries.isFetchingError != null) {
                dispatch(setCountriesFromStorage(JSON.parse(localStorage.getItem('CountriesList'))))
                toast.warn(countries.isFetchingError + ' List of countries was load from Local storage')
            } else if (!localStorage.getItem('CountriesList') && countries.isFetchingError != null) {
                toast.error('Local storage is empty and ' + countries.isFetchingError)
            }
        },
        [dispatch, countries.isFetchingError, countries.hasFetched, countries.countriesList])

    return (
        <div className="App">
            <Navbar/>
            {param === null? <CountriesList {...countries}/> : <Country name={param} />}
            <div>
                <ToastContainer autoClose={10000}/>
            </div>
        </div>
    );
}

export default App;
