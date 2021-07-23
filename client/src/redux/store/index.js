import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../reducers/searchSlice";
import terrestrialReducer from "../reducers/terrestrialSlice";
import modalReducer from '../reducers/modalSlice';
import activeAreaReducer from '../reducers/activeAreaSlice'
import activeObservationReducer from "../reducers/activeObservationSlice";
import areaBoundsReducer from '../reducers/areaBoundsSlice'
import loginReducer from '../reducers/loginSlice';
import navbarReducer from "../reducers/navbarSlice";

const store = configureStore({
  reducer: {
    search: searchReducer,
    terrestrial: terrestrialReducer,
    modal: modalReducer,
    activeArea: activeAreaReducer,
    activeObservation: activeObservationReducer,
    areaBounds: areaBoundsReducer,
    login: loginReducer,
    navbar: navbarReducer

  },
});

export default store;