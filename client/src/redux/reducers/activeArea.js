import { ACTIVE_AREA } from "../constants/action-types";

const activeAreaReducer = (state = null, action) => {
  switch (action.type) {
    case ACTIVE_AREA:
      return action.payload;
    default:
      return state;
  }
};

export default activeAreaReducer;
