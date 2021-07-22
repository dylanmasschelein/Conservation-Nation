import { combineReducers } from "redux";
import modal from "./modal";
import navbar from "./navbar";
import login from "./login";

export default combineReducers({
  modal,
  navbar,
  login,
});
