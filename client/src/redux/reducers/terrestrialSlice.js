import { createSlice } from "@reduxjs/toolkit";

const terrestrialSlice = createSlice({
  name: "terrestrial",
  initialState: "all",
  reducers: {
    terrestrialSearch: (state, action) => {
      return action.payload;
    },
  },
});

export default terrestrialSlice.reducer;

export const { terrestrialSearch } = terrestrialSlice.actions;
