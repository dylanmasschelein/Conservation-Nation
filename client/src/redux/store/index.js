import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "../reducers";
import thunkMiddleware from "redux-thunk";
import api from "../middleware/api";
// import * as actions from "../actions/api";

const composedEnhancer = composeWithDevTools(
  applyMiddleware(thunkMiddleware, api)
);
const store = createStore(reducer, composedEnhancer);

export default store;
