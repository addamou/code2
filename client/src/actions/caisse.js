import { toast } from "react-toastify";
import api from "../utils/api";
import {
  CAISSE_ERROR,
  CREATE_CAISSE_SUCCESS,
  DELETE_CAISSE_SUCCESS,
  GET_CAISSE_SUCCESS,
} from "./types";

//Get Rapport de caisse
export const getRCaisse = () => async (dispatch) => {
  try {
    const res = await api.get("/caisse");

    dispatch({
      type: GET_CAISSE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CAISSE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Create rapport caisse
export const createRappCaisse = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/caisse", formData);

    dispatch({
      type: CREATE_CAISSE_SUCCESS,
      payload: res.data,
    });
    toast.success("Rapport de caisse enregistrer", { position: "top-right" });
  } catch (err) {
    dispatch({
      type: CAISSE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Effacer un rapport de caisse
export const deleteCaisse = (id) => async (dispatch) => {
  if (window.confirm("Est tu sure ? de supprimer ce donnée !")) {
    try {
      const res = await api.delete(`/caisse/${id}`);

      dispatch({
        type: DELETE_CAISSE_SUCCESS,
        payload: res.data,
      });
      toast.success("Rapport de caisse effacé", { position: "top-right" });
    } catch (err) {
      dispatch({
        type: CAISSE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
