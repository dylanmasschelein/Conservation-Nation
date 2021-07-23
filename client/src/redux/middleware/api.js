import axios from "axios";
import * as actions from "../actions/actionCreators";

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiCallBegan.type) return next(action);

    next(action);
    const { url, method, data, onSuccess, onError } = action.payload;
    try {
      const response = await axios.request({
        url,
        method,
        data,
      });

      dispatch(actions.apiCallSuccess(response.data));
      if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
    } catch (err) {
      dispatch(actions.apiCallFailed(err));
      if (onError) dispatch({ type: onError, payload: err });
    }
  };

export default api;

// const areasSlice = createSlice({
//   name: "areas",
//   initialState: null,
//   reduceders: {
//     setAreas: () => (dispatch) => {
//         // call api
//         //resolved: dispatch(success)
//         // rejected: dispatch(error)
//     },
//   },
// });

// export default areasSlice.reducer;
// export const { setAreas } = areasSlice.actions;

// const actionCreator = () => dispatch => {
//        // call api
//         //resolved: dispatch(success)
//         // rejected: dispatch(error)
// }
