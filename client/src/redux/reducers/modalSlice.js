import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggleModal: false,
  redirect: "",
  text: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    displayModal: (state, action) => {
      const { toggleModal, redirect, text } = action.payload;
      return {
        toggleModal,
        redirect,
        text,
      };
    },
    closeModal: (state, action) => {
      return {
        toggleModal: false,
        redirect: "",
        text: "",
      };
    },
  },
});

export default modalSlice.reducer;
export const { displayModal, closeModal } = modalSlice.actions;
