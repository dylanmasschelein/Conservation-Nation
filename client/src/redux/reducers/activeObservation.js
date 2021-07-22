import {
  ACTIVE_OBSERVATION,
  RESET_OBSERVATION,
} from "../constants/action-types";

const activeObservationReducer = (state = null, action) => {
  switch (action.type) {
    case ACTIVE_OBSERVATION:
      return action.payload;
    case RESET_OBSERVATION:
      return null;
    default:
      return state;
  }
};

export default activeObservationReducer;
