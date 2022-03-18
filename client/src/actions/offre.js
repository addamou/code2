import { toast } from "react-toastify";
import api from "../utils/api";
import {
  CREATE_OFFRE_SUCCESS,
  DELETE_OFFRE_FAIL,
  DELETE_OFFRE_SUCCESS,
  GET_OFFRE_SUCCESS,
  OFFRE_ERROR,
} from "./types";

//Création de offres de service
export const createOffre = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/offre", formData);

    dispatch({
      type: CREATE_OFFRE_SUCCESS,
      payload: res.data,
    });
    toast.info("Offre créé avec succés", { position: "top-center" });
  } catch (err) {
    dispatch({
      type: OFFRE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//afficher les offres
export const getOffre = () => async (dispatch) => {
  try {
    const res = await api.get("/offre");

    dispatch({
      type: GET_OFFRE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: OFFRE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//effacer les offres
export const deleteOffre = (id) => async (dispatch) => {
  try {
    window.confirm("Est tu sure ? de supprimer cet agent !");
    const res = await api.delete(`/offre/${id}`);

    dispatch({
      type: DELETE_OFFRE_SUCCESS,
      payload: res.data,
    });

    toast.info("Cet offre de service est effacé", { position: "top-left" });
  } catch (err) {
    dispatch({
      type: DELETE_OFFRE_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
