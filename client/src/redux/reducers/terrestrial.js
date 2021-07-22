import { TERRESTRIAL_SEARCH } from "../constants/action-types";

const terrestrialSearch = (state = "all", action) => {
  switch (action.type) {
    case TERRESTRIAL_SEARCH:
      return action.payload;
    default:
      return state;
  }
};

export default terrestrialSearch;
