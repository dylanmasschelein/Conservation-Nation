import { TOGGLE_MODAL_ON, TOGGLE_MODAL_OFF } from "../constants/action-types";

const initialModalState = {
  toggleModal: false,
  redirect: "",
  text: "",
};

const toggleModalReducer = (state = initialModalState, action) => {
  switch (action.type) {
    case TOGGLE_MODAL_ON:
      const { toggleModal, redirect, text } = action.payload;
      return {
        toggleModal,
        redirect,
        text,
      };
    case TOGGLE_MODAL_OFF:
      return {
        toggleModal: false,
        redirect: "",
        text: "",
      };
    default:
      return state;
  }
};

export default toggleModalReducer;
