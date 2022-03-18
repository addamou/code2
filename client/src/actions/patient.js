import { toast } from "react-toastify";
import api from "../utils/api";
import {
  CREATE_PATIENT_SUCCESS,
  DELETE_PATIENT_SUCCESS,
  GET_PATIENT_SUCCESS,
  PATIENT_ERROR,
  UPDATE_PATIENT_SUCCESS,
} from "./types";

//recuperer tous les patients
export const getPatient = () => async (dispatch) => {
  try {
    const res = await api.get("/patient");

    dispatch({
      type: GET_PATIENT_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PATIENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Creation de patient
export const createPatient = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/patient", formData);

    dispatch({
      type: CREATE_PATIENT_SUCCESS,
      payload: res.data,
    });
    toast.success("Le compte du patient est créé.", { position: "top-center" });
  } catch (err) {
    dispatch({
      type: PATIENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//mise a jour profil patient
export const updatePatient = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/patient/update", formData);

    dispatch({
      type: UPDATE_PATIENT_SUCCESS,
      payload: res.data,
    });
    toast.success("Vous venez de mettre à jour le profil du patient.", {
      position: "top-center",
    });
  } catch (err) {
    dispatch({
      type: PATIENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//effacer le compte du patient
export const deletePatient = (id) => async (dispatch) => {
  if (window.confirm("Est tu sure ? de supprimer ce donnée !")) {
    try {
      const res = await api.delete(`/patient/${id}`);

      dispatch({
        type: DELETE_PATIENT_SUCCESS,
        payload: res.data,
      });

      toast.info("Le compte de ce patient est effacer", {
        position: "top-center",
      });
    } catch (err) {
      dispatch({
        type: PATIENT_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
