import { createSlice } from "@reduxjs/toolkit";

const areasSlice = createSlice({
  name: "areas",
  initialState: null,
  reducers: {
    areas: (state, action) => {
      return action.payload;
    },
    // landAreasRecieved: (state, action) => {
    //   const { areas, loading } = action.payload;
    //   return {
    //     areas,
    //     loading,
    //   };
    // },
    // allAreasRecieved: (state, action) => {
    //   const { areas, loading } = action.payload;
    //   return {
    //     areas,
    //     loading,
    //   };
    //     },
  },
});

export default areasSlice.reducer;
export const { areas } = areaSlice.actions;
