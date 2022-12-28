import {
  LOADING,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_RESET,
} from "../constants/action";

export default function userReducer(state = {}, action) {
  try {
    switch (action.type) {
      case UPDATE_PROFILE_REQUEST:
        return {
          ...state,
          LOADING: true,
        };

      case UPDATE_PROFILE_SUCCESS:
        return {
          ...state,
          LOADING: false,
          isUpdated: action.payload,
        };

      case UPDATE_PROFILE_RESET:
        return {
          ...state,
          isUpdated: false,
        };

      default:
        return state;
    }
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
}
