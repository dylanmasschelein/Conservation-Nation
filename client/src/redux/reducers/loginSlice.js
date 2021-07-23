import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: false,
  reducer: {
    toggleLogin: (state, action) => {
      return action.payload;
    },
  },
});

export default loginSlice.reducer;
export const { toggleLogin } = loginSlice.actions;
