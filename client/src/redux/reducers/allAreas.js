import { GET_MARINE_AREAS } from "../constants/action-types";

const areasReducer = (state = null, action) => {
  switch (action.type) {
    case GET_MARINE_AREAS:
      return action.payload;
    default:
      return state;
  }
};

export default areasReducer;
