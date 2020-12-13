import { createAction } from "@reduxjs/toolkit";

export const setCitiesFromStorage = createAction('setCitiesFromStorage')

export const setCountryToFavorites = createAction('setCountryToFavorites')

export const removeCountryFromFavorites = createAction('removeCountryFromFavorites')