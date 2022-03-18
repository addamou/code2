import { toast } from "react-toastify";
import api from "../utils/api";
import {
  CREATE_FINANCE_SUCCESS,
  DELETE_FINANCE_SUCCESS,
  FINANCE_ERROR,
  GET_FINANCE_SUCCESS,
} from "./types";

//Get Rapport de finance
export const getRappFinancier = () => async (dispatch) => {
  try {
    const res = await api.get("/finance");

    dispatch({
      type: GET_FINANCE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: FINANCE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Create rapport finance
export const createRappFinancier = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/finance", formData);

    dispatch({
      type: CREATE_FINANCE_SUCCESS,
      payload: res.data,
    });
    toast.success("Rapport de validation de caisse enregistrer", {
      position: "top-center",
    });
  } catch (err) {
    dispatch({
      type: FINANCE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Effacer un rapport de caisse
export const deleteFinance = (id) => async (dispatch) => {
  if (window.confirm("Est tu sure ? de supprimer ce donnée !")) {
    try {
      const res = await api.delete(`/finance/${id}`);

      dispatch({
        type: DELETE_FINANCE_SUCCESS,
        payload: res.data,
      });
      toast.info("Rapport de validation de caisse effacé", {
        position: "top-center",
      });
    } catch (err) {
      dispatch({
        type: FINANCE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
