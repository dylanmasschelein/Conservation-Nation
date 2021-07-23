import { createSlice } from "@reduxjs/toolkit";

const activeAreaSlice = createSlice({
  name: "activeArea",
  initialState: null,
  reducers: {
    activeArea: (state, action) => {
      return action.payload;
    },
  },
});

export default activeAreaSlice.reducer;
export const { activeArea } = activeAreaSlice.actions;
