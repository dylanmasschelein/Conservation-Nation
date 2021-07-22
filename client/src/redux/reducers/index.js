import { combineReducers } from "redux";
import modal from "./modal";
import navbar from "./navbar";
import login from "./login";
import areaSearch from "./areaSearch";

export default combineReducers({
  modal,
  navbar,
  login,
  areaSearch,
});
