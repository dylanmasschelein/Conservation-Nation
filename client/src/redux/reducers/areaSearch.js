import { SEARCH_AREA } from "../constants/action-types";

const areaSearchReducer = (state = "", action) => {
  switch (action.type) {
    case SEARCH_AREA:
      return action.payload;
    default:
      return state;
  }
};

export default areaSearchReducer;
