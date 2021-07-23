import { combineReducers } from "redux";
import modal from "./modal";
import navbar from "./navbar";
import login from "./login";
import areaSearch from "./areaSearch";
import terrestrial from "./terrestrial";
import areaBounds from "./areaBounds";
import activeObservation from "./activeObservation";
import activeArea from "./activeArea";
import allAreas from "./allAreas";

export default combineReducers({
  modal,
  navbar,
  login,
  areaSearch,
  terrestrial,
  areaBounds,
  activeObservation,
  activeArea,
  allAreas,
});
