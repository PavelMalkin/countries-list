import React, {useEffect} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {getCountriesList} from "./redux/appThunk";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import CountriesList from "./components/basic/CountriesList";
import {setCitiesFromStorage} from "./redux/actions/countriesActions"

function App() {
    const dispatch = useDispatch();
    const countries = useSelector(store => store.countries)

    useEffect(() => {
        if (!countries.hasFetched && !countries.isFetching && countries.isFetchingError === null) {
            dispatch(getCountriesList());
        }
    }, [countries.hasFetched, countries.isFetching, countries.isFetchingError, dispatch])


    useEffect(() => {
            if (countries.hasFetched && countries.countriesList.length) {
                localStorage.setItem('CountriesList', JSON.stringify(countries.countriesList))
            } else if (localStorage.getItem('CountriesList') && countries.isFetchingError != null) {
                dispatch(setCitiesFromStorage(JSON.parse(localStorage.getItem('CountriesList'))))
                toast.warn(countries.isFetchingError + ' List of countries was load from Local storage')
            } else if (!localStorage.getItem('CountriesList') && countries.isFetchingError != null) {
                toast.error('Local storage is empty and ' + countries.isFetchingError)
            }
        },
        [dispatch, countries.isFetchingError, countries.hasFetched, countries.countriesList])


    return (
        <div className="App">
            <CountriesList {...countries}/>
            <div>
                <ToastContainer autoClose={10000}/>
            </div>
        </div>
    );
}

export default App;
