import { combineReducers } from "redux";
import searchReducer from "./searchSlice";
import terrestrialReducer from "./terrestrialSlice";
import modalReducer from "./modalSlice";
import activeAreaReducer from "./activeAreaSlice";
import activeObservationReducer from "./activeObservationSlice";
import areaBoundsReducer from "./areaBoundsSlice";
import loginReducer from "./loginSlice";
import navbarReducer from "./navbarSlice";

const reducer = combineReducers({
  search: searchReducer,
  terrestrial: terrestrialReducer,
  modal: modalReducer,
  activeArea: activeAreaReducer,
  activeObservation: activeObservationReducer,
  areaBounds: areaBoundsReducer,
  login: loginReducer,
  navbar: navbarReducer,
});

export default reducer;
