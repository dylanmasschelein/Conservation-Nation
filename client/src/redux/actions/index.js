import axios from "axios";
import { createAction } from "@reduxjs/toolkit";

import {
  TOGGLE_MODAL_ON,
  TOGGLE_MODAL_OFF,
  TOGGLE_NAVBAR,
  TOGGLE_LOGIN,
  SEARCH_AREA,
  TERRESTRIAL_SEARCH,
  AREA_BOUNDS,
  ACTIVE_OBSERVATION,
  RESET_OBSERVATION,
  ACTIVE_AREA,
  GET_MARINE_AREAS,
} from "../constants/action-types";

export const toggleModalOn = (value) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_MODAL_ON,
      payload: value,
    });
  };
};

export const toggleModalOff = (value) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_MODAL_OFF,
      payload: value,
    });
  };
};

export const toggleNavbar = (value) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_NAVBAR,
      payload: value,
    });
  };
};

export const toggleLogin = (value) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_LOGIN,
      payload: value,
    });
  };
};

export const areaSearch = (value) => {
  return (dispatch) => {
    dispatch({
      type: SEARCH_AREA,
      payload: value,
    });
  };
};

export const terrestrialSearch = (value) => {
  return (dispatch) => {
    dispatch({
      type: TERRESTRIAL_SEARCH,
      payload: value,
    });
  };
};

export const setAreaBounds = (value) => {
  return (dispatch) => {
    dispatch({
      type: AREA_BOUNDS,
      payload: value,
    });
  };
};

export const setActiveObservation = (value) => {
  return (dispatch) => {
    dispatch({
      type: ACTIVE_OBSERVATION,
      payload: value,
    });
  };
};

export const resetObservation = (value) => {
  return (dispatch) => {
    dispatch({
      type: RESET_OBSERVATION,
      payload: value,
    });
  };
};

export const activeArea = (value) => {
  return (dispatch) => {
    dispatch({
      type: ACTIVE_AREA,
      payload: value,
    });
  };
};

// export const getMarineAreas = (value) => {
//   return (dispatch) => {
//     dispatch({
//       type: GET_MARINE_AREAS,
//       payload: value,
//     });
//   };
// };
