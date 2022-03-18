import { toast } from "react-toastify";
import api from "../utils/api";
import {
  CREATE_RAPPORT_MEDECIN_SUCCESS,
  DELETE_RAPPORT_MEDECIN_SUCCESS,
  GET_RAPPORT_MEDECIN,
  RAPPORT_MEDECIN_ERROR,
} from "./types";

//Get RapporMedecin
export const getRMedecin = () => async (dispatch) => {
  try {
    const res = await api.get("/rapportmedecin");

    dispatch({
      type: GET_RAPPORT_MEDECIN,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: RAPPORT_MEDECIN_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Create rapport Medecin
export const createRappMedecin = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/rapportmedecin", formData);

    dispatch({
      type: CREATE_RAPPORT_MEDECIN_SUCCESS,
      payload: res.data,
    });

    toast.success("Rapport du patient enregistrer", { position: "top-right" });
  } catch (err) {
    dispatch({
      type: RAPPORT_MEDECIN_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Effacer un rapport de Medecin
export const deleteRappMedecin = (id) => async (dispatch) => {
  if (window.confirm("Est tu sure ? de supprimer ce donnée !")) {
    try {
      const res = await api.delete(`/rapportmedecin/${id}`);

      dispatch({
        type: DELETE_RAPPORT_MEDECIN_SUCCESS,
        payload: res.data,
      });

      toast.info("Rapport du patient effacé", { position: "top-left" });
    } catch (err) {
      dispatch({
        type: RAPPORT_MEDECIN_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
