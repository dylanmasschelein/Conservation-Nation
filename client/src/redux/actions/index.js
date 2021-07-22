import {
  TOGGLE_MODAL_ON,
  TOGGLE_MODAL_OFF,
  TOGGLE_NAVBAR,
  TOGGLE_LOGIN,
  SEARCH_AREA,
} from "../constants/action-types";

export const toggleModalOn = (value) => ({
  type: TOGGLE_MODAL_ON,
  payload: value,
});

export const toggleModalOff = (value) => ({
  type: TOGGLE_MODAL_OFF,
  payload: value,
});

export const toggleNavbar = (value) => ({
  type: TOGGLE_NAVBAR,
  payload: value,
});

export const toggleLogin = (value) => ({
  type: TOGGLE_LOGIN,
  payload: value,
});

export const areaSearch = (value) => ({
  type: SEARCH_AREA,
  payload: value,
});
