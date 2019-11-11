import { GET_ERRORS } from "./types";
import { SET_CURRENT_USER, LOGOUT_USER } from "./types";
import axios from "axios";
import setAuthHeader from "./../utils/setAuthHeader";
import jwt_decode from "jwt-decode";

// Login User

export const loginUser = (userData, history) => dispatch => {
  console.log(userData);
  axios
    .post("/api/auth/login", userData)
    .then(response => {
      //Store Token
      const { token } = response.data;
      // Store in local storage
      localStorage.setItem("jwtToken", token);
      // Set token to all axios req
      setAuthHeader(token);
      //Decode token to get user data
      const decoded = jwt_decode(token);
      //Set Current User
      dispatch(setCurrentUser(decoded));
      history.push("/admin");
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

//setCurrentUser
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//logout user
export const logoutUser = history => dispatch => {
  localStorage.removeItem("jwtToken");
  console.log("TOKEN REMOVED ", localStorage.getItem("jwtToken"));
  setAuthHeader(false);
  history.push("/");

  dispatch({
    type: LOGOUT_USER,
    payload: false
  });
};
