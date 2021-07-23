import { createSlice } from "@reduxjs/toolkit";

const areaBoundsSlice = createSlice({
  name: "areaBounds",
  initialState: null,
  reducers: {
    setAreaBounds: (state, action) => {
      const { neLat, neLng, swLat, swLng } = action.payload;
      return {
        neLat,
        neLng,
        swLat,
        swLng,
      };
    },
  },
});

export default areaBoundsSlice.reducer;
export const { setAreaBounds } = areaBoundsSlice.actions;
