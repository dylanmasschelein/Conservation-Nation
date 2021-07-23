import { createSlice } from "@reduxjs/toolkit";

const navbarSlice = createSlice({
  name: "navbar",
  initialState: false,
  reducers: {
    toggleNavbar: (state, action) => {
      return action.payload;
    },
  },
});

export default navbarSlice.reducer;
export const { toggleNavbar } = navbarSlice.actions;
