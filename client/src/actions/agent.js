import { toast } from "react-toastify";
import api from "../utils/api";
import {
  DELETE_USER_FAIL,
  DELETE_USER_SUCCESS,
  GET_USER_FAIL,
  GET_USER_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_SUCCESS,
  USER_PROFILE_FAIL,
  USER_PROFILE_SUCCESS,
} from "./types";

//trouver les agents
export const getAgent = () => async (dispatch) => {
  try {
    const res = await api.get("/users");

    dispatch({
      type: GET_USER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_USER_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//update Profile
export const profilAgent = (id, formData) => {
  return async (dispatch) => {
    try {
      //make http call to our backend
      const { data } = await api.put(`/users/${id}`, formData);
      dispatch({
        type: USER_PROFILE_SUCCESS,
        payload: data,
      });
      toast.success("Votre profil est mise à jour.", {
        position: "top-center",
      });
    } catch (err) {
      dispatch({
        type: USER_PROFILE_FAIL,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};

//update password
export const passwordAgent = (id, reset) => {
  return async (dispatch) => {
    try {
      //make http call to our backend
      const { data } = await api.patch(`/users/${id}`, reset);
      dispatch({
        type: UPDATE_PASSWORD_SUCCESS,
        payload: data,
      });
      toast.success("Votre mot de passe est bien modifié.", {
        position: "top-center",
      });
    } catch (err) {
      dispatch({
        type: UPDATE_PASSWORD_FAIL,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};

export const passwordReset = (id, passe) => async (dispatch) => {
  try {
    const res = await api.post("/users/reset", { id, passe });

    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      payload: res.data,
    });
    toast.info("Félicitation le nouveau mot de passe est 0000", {
      position: "top-center",
    });
  } catch (err) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Effacer un utilisateur de la liste des agents de la clinique
export const deleteAgent = (id) => async (dispatch) => {
  if (window.confirm("Est tu sure ? de supprimer cet agent !")) {
    try {
      const res = await api.delete(`/users/${id}`);

      dispatch({
        type: DELETE_USER_SUCCESS,
        payload: res.data,
      });
      toast.success("Le compte de cet utilisateur est supprimé.", {
        position: "top-center",
      });
    } catch (err) {
      dispatch({
        type: DELETE_USER_FAIL,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
