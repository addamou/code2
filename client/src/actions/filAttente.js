import { toast } from "react-toastify";
import api from "../utils/api";
import {
  ACCUEIL_ERROR,
  CREATE_ACCUEIL_SUCCESS,
  GET_ACCUEIL_SUCCESS,
  GET_MEDECIN_SUCCESS,
  MEDECIN_ERROR,
  RETIRER_ERROR,
  RETIRER_SUCCESS,
  VALIDATION_ERROR,
  VALIDATION_SUCCESS,
} from "./types";

//fil d'attente au niveau de la reception
export const filAccueil = () => async (dispatch) => {
  try {
    const res = await api.get("/reception");

    dispatch({
      type: GET_ACCUEIL_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ACCUEIL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//fil d'attente au niveau des medecins
export const filMedecin = () => async (dispatch) => {
  try {
    const res = await api.get("/medecins");

    dispatch({
      type: GET_MEDECIN_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: MEDECIN_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//ajouter un patient dans la fil d'attente par l'accueil
export const createAccueil = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/accueil/add", formData);

    dispatch({
      type: CREATE_ACCUEIL_SUCCESS,
      payload: res.data,
    });
    toast.info("Le patient est prise en charge.", {
      position: "top-center",
    });
  } catch (err) {
    dispatch({
      type: ACCUEIL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//retirer de la liste des patients au niveau de la perception
export const retirerListeAccueil = (id) => async (dispatch) => {
  if (window.confirm("Voulez vous le retiré de la fil d'attente ?")) {
    try {
      const res = await api.delete(`/reception/${id}`);
      const res2 = await api.delete(`/accueil/${id}`);
      dispatch({
        type: RETIRER_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: RETIRER_SUCCESS,
        payload: res2.data,
      });
      toast.info("Le patient est bien retirer de la fil d'attente.", {
        position: "top-center",
      });
    } catch (err) {
      dispatch({
        type: RETIRER_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

//valider un patient rediriger pour bulletin d'examen ou soin d'urgence
export const validePerception = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/accueil/perception", formData);

    dispatch({
      type: VALIDATION_SUCCESS,
      payload: res.data,
    });
    toast.info("Le patient est pris en charge.", {
      position: "top-center",
    });
  } catch (err) {
    dispatch({
      type: VALIDATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//retirer de la liste des patient en attente chez les medecins ou infirmiere
export const retirerListeMedecin = (id) => async (dispatch) => {
  if (window.confirm("Voulez vous le retiré de la fil d'attente ?")) {
    try {
      const res = await api.delete(`/medecins/${id}`);
      if (res) {
        const Id = res.data._id;
        const res2 = await api.delete(`/accueil/${Id}`);
        dispatch({
          type: RETIRER_SUCCESS,
          payload: res.data,
        });

        dispatch({
          type: RETIRER_SUCCESS,
          payload: res2.data,
        });
      }
      toast.info("Le patient est bien retirer de la fil d'attente.", {
        position: "top-center",
      });
    } catch (err) {
      dispatch({
        type: RETIRER_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
