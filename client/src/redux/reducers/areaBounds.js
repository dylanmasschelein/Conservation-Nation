import { AREA_BOUNDS } from "../constants/action-types";

const areaBoundsReducer = (state = null, action) => {
  switch (action.type) {
    case AREA_BOUNDS:
      const { neLat, neLng, swLat, swLng } = action.payload;
      return {
        neLat,
        neLng,
        swLat,
        swLng,
      };
    default:
      return state;
  }
};

export default areaBoundsReducer;
