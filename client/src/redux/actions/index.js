import { TOGGLE_MODAL_ON, TOGGLE_MODAL_OFF } from "../constants/action-types";

export const toggleModalOn = (value) => ({
  type: TOGGLE_MODAL_ON,
  payload: value,
});

export const toggleModalOff = (value) => ({
  type: TOGGLE_MODAL_OFF,
  payload: value,
});
