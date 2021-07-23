import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: false,
  reducers: {
    toggleLogin: (state, action) => {
      return action.payload;
    },
  },
});

export default loginSlice.reducer;
export const { toggleLogin } = loginSlice.actions;
