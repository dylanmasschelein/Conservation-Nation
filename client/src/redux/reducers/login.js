import { TOGGLE_LOGIN } from "../constants/action-types";

const loginReducer = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_LOGIN:
      return action.payload;
    default:
      return state;
  }
};

export default loginReducer;
