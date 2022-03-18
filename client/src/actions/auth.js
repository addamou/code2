import { toast } from "react-toastify";
import api from "../utils/api";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./types";

/*
  NOTE: we don't need  object for axios as the
 default headers in axios are already Content-Type: application/json
 also axios stringifies and parses JSON for you, so no need for 
 JSON.stringify or JSON.parse
*/

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get("/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
    toast.success("Bienvenu sur le Plate Forme de AFOUA.");
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/users", formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    toast.success("Le compte de cet agent est créé", { position: "top-left" });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      //errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      errors.forEach((error) =>
        toast.error(error.msg, { position: "top-left" })
      );
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login User
export const login = (phone, password) => async (dispatch) => {
  const body = { phone, password };

  try {
    const res = await api.post("/auth", body);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        toast.error(error.msg, { position: "top-left" })
      );
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout
export const logout = () => ({ type: LOGOUT });
