import { configureStore } from "@reduxjs/toolkit";
import reducer from "../reducers";
import api from "../middleware/api";
import * as actions from "../actions/actionCreators";

const store = configureStore({
  reducer,
  middleware: [api],
});

store.dispatch(
  actions.apiCallBegan({
    url: "/areas/marine/Portuga",
    onSuccess: "areasReceived",
  })
);

export default store;
