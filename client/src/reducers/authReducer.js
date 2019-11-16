import { SET_CURRENT_USER, LOGOUT_USER } from "../actions/types";
const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  console.log(action.payload);
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
    case LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
}
