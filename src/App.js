import React, {useEffect} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {getCountriesList} from "./redux/appThunk";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const dispatch = useDispatch();
    const countries = useSelector(store => store.countries)

    useEffect(() => {
        if (!countries.hasFetched && !countries.isFetching && countries.isFetchingError === null) {
            dispatch(getCountriesList());
        }
    }, [countries.hasFetched, countries.isFetching, countries.isFetchingError, dispatch])

    useEffect(()=>{
        if (countries.isFetchingError != null) {
            toast.error(countries.isFetchingError)
        }
    }, [countries.isFetchingError])


    return (
        <div className="App">
            test

            <div>
                <ToastContainer  autoClose={4000}/>
            </div>
        </div>
    );
}

export default App;
