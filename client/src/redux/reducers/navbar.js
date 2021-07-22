import { TOGGLE_NAVBAR } from "../constants/action-types";

const navbarReducer = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_NAVBAR:
      return action.payload;
    default:
      return state;
  }
};

export default navbarReducer;
