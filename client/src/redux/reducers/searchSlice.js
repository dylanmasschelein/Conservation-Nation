import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: "",
  reducers: {
    areaSearch: (state, action) => {
      return action.payload;
    },
  },
});

export default searchSlice.reducer;

export const { areaSearch } = searchSlice.actions;
