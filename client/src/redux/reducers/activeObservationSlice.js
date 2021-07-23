import { createSlice } from "@reduxjs/toolkit";

const activeObservationSlice = createSlice({
  name: "activeObservation",
  initialState: null,
  reducers: {
    setActiveObservation: (state, action) => {
      return action.payload;
    },
    clearObservation: (state, action) => {
      return null;
    },
  },
});

export default activeObservationSlice.reducer;
export const { setActiveObservation, clearObservation } =
  activeObservationSlice.actions;
