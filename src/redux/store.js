import { configureStore } from '@reduxjs/toolkit';

import countriesReducer from "./reducers/countriesReducer";

export default configureStore({
  reducer: {
    countries: countriesReducer,
  },
});
